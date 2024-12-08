'use client';

import React, { useState, useEffect } from 'react';
import styles from './StockTickers.module.css';
import Link from 'next/link';
import { colors } from '@/utils/constants';

async function loadStocks() {
	const res = await fetch('http://localhost:3001/stocks');
	const data = await res.json();
	return data;
}

function StockTickers() {
	const [stocks, setStocks] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const itemsToShow = 3; // Número de elementos por página

	// Carga de datos con useEffect
	useEffect(() => {
		async function fetchStocks() {
			const data = await loadStocks();
			setStocks(data);
		}
		fetchStocks();
	}, []);

	// Validar que hay datos antes de renderizar
	if (!Array.isArray(stocks) || stocks.length === 0) {
		return <div>Loading...</div>;
	}

	// Obtener los elementos a renderizar según el índice actual
	const itemsToRender = stocks.slice(currentIndex, currentIndex + itemsToShow);

	// Función para avanzar al siguiente conjunto de elementos
	const nextItems = () => {
		if (currentIndex + itemsToShow < stocks.length) {
			setCurrentIndex(currentIndex + itemsToShow);
		}
	};

	// Función para retroceder al conjunto anterior de elementos
	const prevItems = () => {
		if (currentIndex - itemsToShow >= 0) {
			setCurrentIndex(currentIndex - itemsToShow);
		}
	};

	return (
		<div className={styles.tickersContainer}>
			<button
				onClick={prevItems}
				disabled={currentIndex === 0}
			>
				{'<'}
			</button>
			<div className={styles.cardContainer}>
				{itemsToRender.map((stock) => (
					<div
						key={stock.ticker}
						className={styles.card}
					>
						<div
							className={styles.cardInformations}
							style={{
								backgroundColor:
									colors[Math.floor(Math.random() * colors.length)],
							}}
						>
							<Link href={`/cards/${stock.ticker}`}>
								<h3>{stock.ticker}</h3>
								<p>{stock.company_name}</p>
								<p>
									Price: {'$'}
									{stock.price}
								</p>
							</Link>
						</div>
					</div>
				))}
			</div>
			<button
				onClick={nextItems}
				disabled={currentIndex + itemsToShow >= stocks.length}
			>
				{'>'}
			</button>
		</div>
	);
}

export default StockTickers;
