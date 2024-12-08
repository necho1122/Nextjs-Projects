import React from 'react';
import styles from './StockTickers.module.css';
import Link from 'next/link';
import { colors } from '@/utils/constants';

async function loadStocks() {
	const res = await fetch('http://localhost:3001/stocks');
	const data = await res.json();
	return data;
}

async function StockTickers() {
	// Carga de datos simultánea con Promise.all
	const stocks = await loadStocks();

	const tickersAmound = stocks.length;
	const itemsToShow = 3;

	if (!Array.isArray(stocks) || stocks.length === 0) return;

	const itemsToRender = stocks.slice(0, itemsToShow);

	return (
		<div className={styles.dashboardContainer}>
			<button>{'<'}</button>
			<div className={styles.cardContainer}>
				{stocks.map((stock) => (
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
			<button>{'>'}</button>
		</div>
	);
}

export default StockTickers;
