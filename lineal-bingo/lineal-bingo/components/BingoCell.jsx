// components/BingoCell.js
import React from 'react';

export function BingoCell({ cell, isWinning, isActive, styles }) {
	return (
		<div
			className={
				isWinning && isActive
					? styles.winningActiveCell
					: isActive
					? styles.activeCell
					: styles.cell
			}
		>
			{cell}
		</div>
	);
}

export default BingoCell;
