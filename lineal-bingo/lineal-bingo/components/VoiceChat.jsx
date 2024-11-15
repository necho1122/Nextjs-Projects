// components/VoiceChat.js
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';

const socket = io('http://localhost:3000'); // Asegúrate de usar el dominio correcto en producción

const VoiceChat = () => {
	const [peers, setPeers] = useState([]);
	const [stream, setStream] = useState(null);
	const [isMicActive, setIsMicActive] = useState(false);
	const audioRef = useRef();
	const micRef = useRef();

	useEffect(() => {
		socket.on('signal', (data) => {
			const peer = peers.find((p) => p.id === data.from);
			if (peer) {
				peer.signal(data.signal);
			} else {
				const newPeer = new SimplePeer({
					initiator: false,
					trickle: false,
				});
				newPeer.signal(data.signal);
				newPeer.on('stream', (stream) => {
					audioRef.current.srcObject = stream;
					audioRef.current.play();
				});
				setPeers([...peers, { id: data.from, peer: newPeer }]);
			}
		});

		return () => {
			peers.forEach(({ peer }) => peer.destroy());
		};
	}, [peers]);

	const handleMicToggle = () => {
		if (isMicActive) {
			stream.getTracks().forEach((track) => track.stop());
			setStream(null);
		} else {
			navigator.mediaDevices
				.getUserMedia({ video: false, audio: true })
				.then((newStream) => {
					setStream(newStream);
					const peer = new SimplePeer({
						initiator: true,
						trickle: false,
						stream: newStream,
					});

					peer.on('signal', (data) => {
						socket.emit('signal', { signal: data, from: socket.id });
					});

					peer.on('stream', (stream) => {
						audioRef.current.srcObject = stream;
						audioRef.current.play();
					});

					setPeers([...peers, { id: socket.id, peer }]);
				});
		}
		setIsMicActive(!isMicActive);
	};

	return (
		<div>
			<button onClick={handleMicToggle}>
				{isMicActive ? 'Cerrar Micrófono' : 'Activar Micrófono'}
			</button>
			<audio
				ref={audioRef}
				controls
			/>
		</div>
	);
};

export default VoiceChat;
