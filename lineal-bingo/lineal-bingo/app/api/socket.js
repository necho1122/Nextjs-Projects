// pages/api/socket.js
import { Server } from 'socket.io';

export default function handler(req, res) {
	if (!res.socket.server.io) {
		const io = new Server(res.socket.server);

		io.on('connection', (socket) => {
			console.log('Usuario conectado');

			// Escucha eventos para señalización WebRTC
			socket.on('signal', (data) => {
				socket.broadcast.emit('signal', data); // Reenvía las señales a otros usuarios
			});

			socket.on('disconnect', () => {
				console.log('Usuario desconectado');
			});
		});

		res.socket.server.io = io;
	}
	res.end();
}
