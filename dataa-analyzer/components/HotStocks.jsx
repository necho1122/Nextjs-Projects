import React from 'react';
import styles from './HotStocks.module.css';

function HotStocks() {
	return (
		<div className={styles.hotStocksComtainer}>
			<h3>Hot Stocks</h3>
			<div>
				<div>
					<p>Stock 1</p>
					<p>Price: $100</p>
				</div>
				<div>
					<p>Stock 2</p>
					<p>Price: $200</p>
				</div>
				<div>
					<p>Stock 3</p>
					<p>Price: $300</p>
				</div>
				<div>
					<p>Stock 4</p>
					<p>Price: $400</p>
				</div>
				<div>
					<p>Stock 5</p>
					<p>Price: $500</p>
				</div>
			</div>
		</div>
	);
}

export default HotStocks;
