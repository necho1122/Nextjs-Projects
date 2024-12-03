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

	const colors = [
		'#FFB3BA', // Rosa suave
		'#FFDFBA', // Durazno
		'#FFFFBA', // Amarillo pastel
		'#BAFFC9', // Verde menta
		'#BAE1FF', // Azul cielo
		'#D5A6FF', // Lavanda
		'#FFC8DD', // Rosa pálido
		'#A8D5E2', // Azul acuarela
		'#B9FBC0', // Verde limón pastel
		'#FDE2E4', // Rosa empolvado
	];

	return (
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
							<p>Price: {"$"}{stock.price}</p>
						</Link>
					</div>
				</div>
			))}
		</div>
	);
}

export default Cards;
