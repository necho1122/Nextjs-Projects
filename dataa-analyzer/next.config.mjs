/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'via.placeholder.com',
				port: '',
				pathname: '/**', // Permitir cualquier ruta
			},
			{
				protocol: 'https',
				hostname: 'cdn-icons-png.flaticon.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
