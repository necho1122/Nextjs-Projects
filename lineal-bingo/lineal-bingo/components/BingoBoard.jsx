import { board } from '@/utilities/constants';
import styles from '../app/page.module.css';

function BingoBoard() {
	return (
		<div className={styles.board}>
			{board.map((row, rowIndex) => (
				<div
					className={styles.row}
					key={rowIndex}
				>
					{row.map((cell) => (
						<div
							className={styles.cell}
							key={cell}
						>
							{cell}
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default BingoBoard;
