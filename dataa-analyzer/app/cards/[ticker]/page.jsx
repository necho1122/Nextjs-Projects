import React from 'react';

function StockTicker({ params }) {
	return (
		<div>
			<h1>{params.ticker}</h1>
		</div>
	);
}

export default StockTicker;
