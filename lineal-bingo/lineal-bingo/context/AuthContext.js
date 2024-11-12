'use client';
import { createContext, useContext, useState } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Hook para usar el contexto en otros componentes
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto para envolver la aplicación
export const AuthProvider = ({ children }) => {
	const [userRole, setUserRole] = useState(null);

	const loginAsAdmin = () => setUserRole('admin');
	const loginAsUser = () => setUserRole('user');
	const logout = () => setUserRole(null);

	return (
		<AuthContext.Provider
			value={{ userRole, loginAsAdmin, loginAsUser, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
