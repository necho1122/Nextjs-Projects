import React from 'react';

async function loadStocks() {
	const res = await fetch('http://localhost:3001/stocks');
	const data = await res.json();
	return data;
}
async function StockTicker({ params }) {
	const { ticker } = params;

	const stocks = await loadStocks();

	const stock = stocks.find((stock) => stock.ticker === ticker);

	return (
		<div>
			<h1>{params.ticker}</h1>
			<p>{stock.company_name}</p>
			<p>{stock.price}</p>
			<p>{stock.change_percent}</p>
		</div>
	);
}

export default StockTicker;
