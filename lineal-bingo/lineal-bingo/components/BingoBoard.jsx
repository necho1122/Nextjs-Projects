'use client';
import { board } from '@/utilities/constants';
import styles from '../app/page.module.css';
import { useState, useEffect, useCallback } from 'react';
import { database, ref, set, onValue } from '@/lib/firebase';
import BingoControlButtons from './BingoControlButtons';
import BingoRow from './BingoRow';
import Header from './Header';
import { useAuth } from '@/context/AuthContext'; // Importa el contexto para el rol de usuario

function BingoBoard() {
	const { userRole } = useAuth(); // Accede al rol del usuario
	const [ficha, setFicha] = useState(null);
	const [randomNumber, setRandomNumber] = useState(null);
	const [usedNumbers, setUsedNumbers] = useState([]);
	const [activeCells, setActiveCells] = useState([]);
	const [winningRows, setWinningRows] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const [isInitialLoad, setIsInitialLoad] = useState(true);

	const updateGameState = useCallback(() => {
		if (isInitialLoad) return;
		const gameStateRef = ref(database, 'gameState');
		set(gameStateRef, {
			ficha,
			randomNumber,
			usedNumbers: usedNumbers || [],
			activeCells: activeCells || [],
			winningRows: winningRows || [],
			gameOver,
		});
	}, [
		ficha,
		randomNumber,
		usedNumbers,
		activeCells,
		winningRows,
		gameOver,
		isInitialLoad,
	]);

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
			setIsInitialLoad(false);
		});
	}, []);

	const handleCellClick = () => {
		if (usedNumbers.length >= 75) {
			setUsedNumbers([]);
			setActiveCells([]);
			setFicha(null);
			setRandomNumber(null);
			setWinningRows([]);
			setGameOver(false);
			updateGameState();
			return;
		}

		let newRandomNumber;
		do {
			newRandomNumber = Math.floor(Math.random() * 75) + 1;
		} while (usedNumbers.includes(newRandomNumber));

		if (usedNumbers.includes(newRandomNumber)) return;

		setRandomNumber(newRandomNumber);
		setFicha(newRandomNumber);
		setUsedNumbers((prev) => [...prev, newRandomNumber]);
		setActiveCells((prevCells) => [...prevCells, newRandomNumber]);
	};

	useEffect(() => {
		if (gameOver) return;
		const newWinningRows = [];
		let shouldEndGame = false;

		board.forEach((row, rowIndex) => {
			const allNumbersInRowDrawn = row.every((number) =>
				usedNumbers.includes(number)
			);
			if (allNumbersInRowDrawn && !winningRows.includes(rowIndex)) {
				newWinningRows.push(rowIndex);
				shouldEndGame = true;
			}
		});

		if (newWinningRows.length > 0) {
			setWinningRows((prevRows) => [...prevRows, ...newWinningRows]);
			if (shouldEndGame && !gameOver) {
				setGameOver(true);
			}
		}
	}, [usedNumbers, winningRows, gameOver]);

	useEffect(() => {
		if (!isInitialLoad) {
			updateGameState();
		}
	}, [isInitialLoad, updateGameState]);

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
		updateGameState();
	};

	return (
		<div className={styles.board}>
			<Header />
			{firstNumber !== null && (
				<div className={styles.firstFicha}>{usedNumbers[0]}</div>
			)}

			{board.map((row, rowIndex) => (
				<BingoRow
					key={rowIndex}
					row={row}
					rowIndex={rowIndex}
					activeCells={activeCells}
					winningRows={winningRows}
					styles={styles}
				/>
			))}

			{/* Renderiza los botones solo si el rol es "admin" */}
			{userRole === 'admin' && (
				<BingoControlButtons
					handleCellClick={handleCellClick}
					handleClearClick={handleClearClick}
					gameOver={gameOver}
				/>
			)}

			<div>{ficha}</div>
		</div>
	);
}

export default BingoBoard;
