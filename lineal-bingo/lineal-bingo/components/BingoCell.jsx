import { useState, useEffect } from 'react';

export function BingoCell({ cell, isWinning, isActive, styles }) {
	const [isEnlarged, setIsEnlarged] = useState(false);

	useEffect(() => {
		if (isActive) {
			setIsEnlarged(true); // Activa la animación
			const timer = setTimeout(() => {
				setIsEnlarged(false); // La desactiva después de 500 ms
			}, 500); // Duración de la animación debe coincidir con el CSS

			return () => clearTimeout(timer); // Limpia el temporizador al desmontar
		}
	}, [isActive]);

	const cellClassName =
		isWinning && isActive
			? `${styles.winningActiveCell} ${isEnlarged ? styles.enlarge : ''}`
			: isActive
			? `${styles.activeCell} ${isEnlarged ? styles.enlarge : ''}`
			: styles.cell;

	return <div className={cellClassName}>{cell}</div>;
}

export default BingoCell;
