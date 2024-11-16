import { Server } from 'socket.io';

let io;

export const config = {
	runtime: 'edge', // Usamos 'edge' para mejorar la performance y habilitar WebSockets
};

const handler = async (req) => {
	// Solo inicializa el servidor de WebSocket una vez
	if (!io) {
		io = new Server({
			path: '/api/socket', // Esta es la ruta que usará el cliente
			transports: ['websocket', 'polling'], // Usamos WebSocket y Polling como transporte
		});

		io.on('connection', (socket) => {
			console.log('Usuario conectado');

			socket.on('signal', (data) => {
				socket.broadcast.emit('signal', data);
			});

			socket.on('disconnect', () => {
				console.log('Usuario desconectado');
			});
		});
	}

	// Responde con un estado exitoso aunque no haya un cuerpo en la respuesta
	return new Response(null, { status: 200 });
};

export default handler;
