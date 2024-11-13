import localFont from 'next/font/local';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext'; // Importa el proveedor

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});

export const metadata = {
	title: 'Bingo Lineal - Daniela',
	description: 'juego de bingo lineal',
};

export default function RootLayout({ children }) {
	return (
		<html lang='es'>
			<body className={geistSans.variable}>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
