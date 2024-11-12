'use client';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import BingoBoard from '@/components/BingoBoard';

export default function Dashboard() {
	const { userRole } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!userRole) {
			router.push('/'); // Redirige al login si no tiene rol asignado
		}
	}, [userRole, router]);

	return (
		<div>
			{userRole === 'admin' && <h2>Admin Dashboard</h2>}
			{userRole === 'user' && <h2>User Dashboard</h2>}
			<BingoBoard />
		</div>
	);
}
