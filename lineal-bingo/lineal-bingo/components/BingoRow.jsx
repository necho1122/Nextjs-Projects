// components/BingoRow.js
import React from 'react';
import BingoCell from './BingoCell';

export function BingoRow({ row, rowIndex, activeCells, winningRows, styles }) {
	return (
		<div
			className={
				winningRows.includes(rowIndex) ? styles.winningRow : styles.row
			}
		>
			{row.map((cell) => (
				<BingoCell
					key={cell}
					cell={cell}
					isWinning={winningRows.includes(rowIndex)}
					isActive={activeCells.includes(cell)}
					styles={styles}
				/>
			))}
			{winningRows.includes(rowIndex) && (
				<span className={styles.winnerMessage}>¡Ganó!</span>
			)}
		</div>
	);
}

export default BingoRow;
