import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const VoiceChat = () => {
	const [isTalking, setIsTalking] = useState(false);
	const socketRef = useRef(null);
	const localStreamRef = useRef(null);
	const peersRef = useRef({});

	useEffect(() => {
		// Conexión con el servidor Socket.io (con ruta personalizada)
		socketRef.current = io('https://bingo-lineal.vercel.app', {
			path: '/api/socket',
		});

		// Escucha las señales WebRTC
		socketRef.current.on('signal', async (data) => {
			const { from, signal } = data;

			if (signal.type === 'offer') {
				const peer = new RTCPeerConnection();
				localStreamRef.current.getTracks().forEach((track) => {
					peer.addTrack(track, localStreamRef.current);
				});

				peer.onicecandidate = (event) => {
					if (event.candidate) {
						socketRef.current.emit('signal', {
							to: from,
							signal: event.candidate,
						});
					}
				};

				peer.ontrack = (event) => {
					const audio = document.createElement('audio');
					audio.srcObject = event.streams[0];
					audio.play();
				};

				await peer.setRemoteDescription(signal);
				const answer = await peer.createAnswer();
				await peer.setLocalDescription(answer);

				socketRef.current.emit('signal', {
					to: from,
					signal: peer.localDescription,
				});
				peersRef.current[from] = peer;
			} else if (signal.candidate) {
				peersRef.current[from]?.addIceCandidate(signal.candidate);
			}
		});

		return () => {
			socketRef.current.disconnect();
		};
	}, []);

	const startTalking = async () => {
		if (!isTalking) {
			// Acceso al micrófono
			localStreamRef.current = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
			setIsTalking(true);

			// Crear oferta WebRTC
			const peer = new RTCPeerConnection();
			localStreamRef.current
				.getTracks()
				.forEach((track) => peer.addTrack(track, localStreamRef.current));

			peer.onicecandidate = (event) => {
				if (event.candidate) {
					socketRef.current.emit('signal', { signal: event.candidate });
				}
			};

			peer.ontrack = (event) => {
				const audio = document.createElement('audio');
				audio.srcObject = event.streams[0];
				audio.play();
			};

			const offer = await peer.createOffer();
			await peer.setLocalDescription(offer);

			socketRef.current.emit('signal', { signal: peer.localDescription });
			peersRef.current['self'] = peer;
		} else {
			// Detener la transmisión de audio
			localStreamRef.current.getTracks().forEach((track) => track.stop());
			setIsTalking(false);
		}
	};

	return (
		<div>
			<button onClick={startTalking}>
				{isTalking ? 'Parar de hablar' : 'Hablar'}
			</button>
		</div>
	);
};

export default VoiceChat;
