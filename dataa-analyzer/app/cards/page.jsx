import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';

async function loadStocks() {
	const res = await fetch('http://localhost:3001/stocks');
	const data = await res.json();
	return data;
}

async function Cards() {
	// Carga de datos simultánea con Promise.all
	const stocks = await loadStocks();

	return (
		<div className={styles.cardContainer}>
			{stocks.map((stock) => (
				<div
					key={stock.ticker}
					className={styles.card}
				>
					<div className={styles.cardInformations}>
						<Link href={`/cards/${stock.ticker}`}>
							<h3>{stock.ticker}</h3>
						</Link>
						<p>{stock.company_name}</p>
					</div>
				</div>
			))}
		</div>
	);
}

export default Cards;
