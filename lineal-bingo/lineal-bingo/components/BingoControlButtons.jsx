// components/BingoControlButtons.js
import React from 'react';

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
			>
				Ficha
			</button>

			<button
				onClick={handleClearClick}
				type='button'
			>
				Reiniciar
			</button>
		</>
	);
}

export default BingoControlButtons;
