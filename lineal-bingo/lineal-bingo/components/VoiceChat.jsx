// components/VoiceChat.js
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';

const socket = io('https://bingo-lineal-server.onrender.com'); // Asegúrate de usar el dominio correcto en producción

const VoiceChat = () => {
	const [peers, setPeers] = useState([]);
	const [isMicActive, setIsMicActive] = useState(false);
	const micStream = useRef();
	const audioRefs = useRef({});

	useEffect(() => {
		socket.on('signal', (data) => {
			const existingPeer = peers.find((peer) => peer.id === data.from);
			if (existingPeer) {
				existingPeer.peer.signal(data.signal);
			} else {
				const newPeer = new SimplePeer({ initiator: false, trickle: false });
				newPeer.signal(data.signal);
				newPeer.on('stream', (remoteStream) => {
					if (!audioRefs.current[data.from]) {
						const audio = document.createElement('audio');
						audio.srcObject = remoteStream;
						audio.play();
						audioRefs.current[data.from] = audio;
					}
				});
				setPeers((prevPeers) => [
					...prevPeers,
					{ id: data.from, peer: newPeer },
				]);
			}
		});

		return () => {
			peers.forEach(({ peer }) => peer.destroy());
		};
	}, [peers]);

	const handleMicToggle = async () => {
		if (isMicActive) {
			micStream.current.getTracks().forEach((track) => track.stop());
			setIsMicActive(false);
		} else {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: false,
					audio: true,
				});
				micStream.current = stream;
				const newPeer = new SimplePeer({
					initiator: true,
					trickle: false,
					stream,
				});

				newPeer.on('signal', (data) => {
					socket.emit('signal', { signal: data, from: socket.id });
				});

				setPeers((prevPeers) => [
					...prevPeers,
					{ id: socket.id, peer: newPeer },
				]);
				setIsMicActive(true);
			} catch (error) {
				console.error('Error al obtener el acceso al micrófono:', error);
			}
		}
	};

	return (
		<div>
			<button onClick={handleMicToggle}>
				{isMicActive ? 'Cerrar Micrófono' : 'Activar Micrófono'}
			</button>
		</div>
	);
};

export default VoiceChat;
