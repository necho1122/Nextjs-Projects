// components/VoiceChat.jsx
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const VoiceChat = () => {
	const [isTalking, setIsTalking] = useState(false);
	const socketRef = useRef(null);
	const localStreamRef = useRef(null);
	const peersRef = useRef({});

	// Verifica dispositivos de entrada de audio
	const getAudioDevices = async () => {
		const devices = await navigator.mediaDevices.enumerateDevices();
		const audioDevices = devices.filter(
			(device) => device.kind === 'audioinput'
		);
		if (audioDevices.length === 0) {
			throw new Error('No se encontraron dispositivos de entrada de audio.');
		}
	};

	useEffect(() => {
		// Inicializa la conexión a Socket.io
		socketRef.current = io('/', { path: '/api/socket' });

		// Escucha señales para WebRTC
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
		try {
			if (!isTalking) {
				// Verifica dispositivos y solicita acceso al micrófono
				await getAudioDevices();
				localStreamRef.current = await navigator.mediaDevices.getUserMedia({
					audio: true,
				});
				setIsTalking(true);

				// Configura la conexión WebRTC
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
				// Detén el stream de audio
				localStreamRef.current.getTracks().forEach((track) => track.stop());
				setIsTalking(false);
			}
		} catch (error) {
			console.error('Error accediendo al micrófono:', error);
			alert(
				'No se pudo acceder al micrófono. Por favor, verifica los permisos o la conexión de hardware.'
			);
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
