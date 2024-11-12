'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext'; // Importa el hook del contexto
import { useRouter } from 'next/navigation';

export default function VerificationPage() {
	const { loginAsAdmin, loginAsUser } = useAuth();
	const [code, setCode] = useState('');
	const router = useRouter();

	const handleLogin = () => {
		if (code === process.env.NEXT_PUBLIC_ADMIN_CODE) {
			loginAsAdmin();
			router.push('/dashboard');
		} else if (code === process.env.NEXT_PUBLIC_USER_CODE) {
			loginAsUser();
			router.push('/dashboard');
		} else {
			alert('Código incorrecto');
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<input
				type='text'
				value={code}
				onChange={(e) => setCode(e.target.value)}
				placeholder='Enter code'
			/>
			<button onClick={handleLogin}>Login</button>
		</div>
	);
}
