// components/BingoControlButtons.js
import React from 'react';
import styles from '../app/page.module.css';

export function BingoControlButtons({
	handleCellClick,
	handleClearClick,
	gameOver,
}) {
	return (
		<>
			<button
				onClick={handleCellClick}
				type='button'
				disabled={gameOver}
				className={styles.button}
			>
				Ficha
			</button>

			<button
				onClick={handleClearClick}
				type='button'
				className={styles.button}
			>
				Reiniciar
			</button>
		</>
	);
}

export default BingoControlButtons;
