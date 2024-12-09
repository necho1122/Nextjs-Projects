import React from 'react';
import Image from 'next/image';
import styles from './StockMarkets.module.css';
function StockMarkets() {
	return (
		<div className={styles.marketsMain}>
			<div className={styles.marketsContainer}>
				<div>NASDAQ</div>
				<div>NYSE</div>
				<div>SSe</div>
				<div>euronext</div>
			</div>
			<Image
				src='/graph.png'
				alt='Stock Market'
				width={300}
				height={200}
			/>
			<div>
				<div>
					<span>high</span>
					<span>$10.000</span>
				</div>
				<div>
					<span>low</span>
					<span>$8.000</span>
				</div>
				<div>
					<span>open</span>
					<span>$9.000</span>
				</div>
				<div>
					<span>close</span>
					<span>$10.000</span>
				</div>
			</div>
		</div>
	);
}

export default StockMarkets;