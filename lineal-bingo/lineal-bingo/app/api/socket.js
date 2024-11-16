import { Server } from 'socket.io';

export const config = {
	runtime: 'edge', // Permite ejecutar esta API route en el entorno edge
};

let io;

const handler = async (req) => {
	if (!io) {
		io = new Server({
			path: '/api/socket',
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

	return new Response(null, { status: 200 });
};

export default handler;
