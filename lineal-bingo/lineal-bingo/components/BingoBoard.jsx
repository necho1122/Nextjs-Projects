'use client';
import { board } from '@/utilities/constants';
import styles from '../app/page.module.css';
import { useState, useEffect } from 'react';
import { database, ref, set, onValue } from '@/lib/firebase';

function BingoBoard() {
	const [ficha, setFicha] = useState(null);
	const [randomNumber, setRandomNumber] = useState(null);
	const [usedNumbers, setUsedNumbers] = useState([]);
	const [activeCells, setActiveCells] = useState([]);
	const [winningRows, setWinningRows] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const [isInitialLoad, setIsInitialLoad] = useState(true); // Estado para manejar la carga inicial

	// Función para actualizar el estado del juego en Firebase
	const updateGameState = () => {
		if (isInitialLoad) return; // Evitar guardar durante la carga inicial
		const gameStateRef = ref(database, 'gameState');
		set(gameStateRef, {
			ficha,
			randomNumber,
			usedNumbers: usedNumbers || [],
			activeCells: activeCells || [],
			winningRows: winningRows || [],
			gameOver,
		});
	};

	// Obtener el estado del juego desde Firebase al cargar el componente
	useEffect(() => {
		const gameStateRef = ref(database, 'gameState');
		onValue(gameStateRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				setFicha(data.ficha || null);
				setRandomNumber(data.randomNumber || null);
				setUsedNumbers(data.usedNumbers || []);
				setActiveCells(data.activeCells || []);
				setWinningRows(data.winningRows || []);
				setGameOver(data.gameOver || false);
			}
			setIsInitialLoad(false); // Marcar como completada la carga inicial
		});
	}, []);

	// Función para manejar el click y generar un número aleatorio único
	function handleCellClick() {
		if (usedNumbers.length >= 75) {
			// Reiniciar el estado del juego si se han generado todos los números
			setUsedNumbers([]);
			setActiveCells([]);
			setFicha(null);
			setRandomNumber(null);
			setWinningRows([]);
			setGameOver(false);
			updateGameState(); // Actualizar Firebase al reiniciar
			return;
		}

		let newRandomNumber;
		do {
			newRandomNumber = Math.floor(Math.random() * 75) + 1;
		} while (usedNumbers.includes(newRandomNumber));

		// Actualizar los estados y llamar a Firebase después de cada cambio de estado
		setRandomNumber(newRandomNumber);
		setFicha(newRandomNumber);
		setUsedNumbers((prev) => [...prev, newRandomNumber]);
		setActiveCells((prevCells) => [...prevCells, newRandomNumber]);
	}

	// Comprobar si todos los números de cada fila han salido y actualizar filas ganadoras
	useEffect(() => {
		const newWinningRows = [];
		let shouldEndGame = false;

		board.forEach((row, rowIndex) => {
			const allNumbersInRowDrawn = row.every((number) =>
				(usedNumbers || []).includes(number)
			);
			if (allNumbersInRowDrawn && !winningRows.includes(rowIndex)) {
				newWinningRows.push(rowIndex);
				shouldEndGame = true;
			}
		});

		if (newWinningRows.length > 0) {
			setWinningRows((prevRows) => [...prevRows, ...newWinningRows]);

			// Solo actualizamos gameOver y el estado en Firebase si hay una fila ganadora
			if (shouldEndGame && !gameOver) {
				setGameOver(true);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [usedNumbers]);

	// Actualizar en Firebase cada vez que gameOver cambie
	useEffect(() => {
		// Solo actualizamos si gameOver ha cambiado a 'true'
		if (gameOver) {
			updateGameState();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ficha, randomNumber, usedNumbers, activeCells, winningRows, gameOver]);

	const firstNumber =
		Array.isArray(usedNumbers) && usedNumbers.length > 0
			? board.find((row) => row.includes(usedNumbers[0]))?.[0]
			: null;

	const handleClearClick = () => {
		setUsedNumbers([]);
		setActiveCells([]);
		setFicha(null);
		setRandomNumber(null);
		setWinningRows([]);
		setGameOver(false);
		updateGameState(); // Actualizar Firebase al reiniciar
	};

	return (
		<div className={styles.board}>
			{firstNumber !== null && (
				<div>
					Ganador Primera Ficha: {usedNumbers[0]}, Línea: {firstNumber}
				</div>
			)}

			{board.map((row, rowIndex) => (
				<div
					className={
						winningRows.includes(rowIndex) ? styles.winningRow : styles.row
					}
					key={rowIndex}
				>
					{row.map((cell) => (
						<div
							className={
								winningRows.includes(rowIndex) && activeCells.includes(cell)
									? styles.winningActiveCell
									: activeCells.includes(cell)
									? styles.activeCell
									: styles.cell
							}
							key={cell}
						>
							{cell}
						</div>
					))}
					{winningRows.includes(rowIndex) && (
						<span className={styles.winnerMessage}>¡Ganó!</span>
					)}
				</div>
			))}

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
			<div>{ficha}</div>
		</div>
	);
}

export default BingoBoard;
