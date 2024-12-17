'use client';
import React from 'react';
import Image from 'next/image';
import styles from './StockMarkets.module.css';
import { useState } from 'react';
function StockMarkets() {
	const [graphImage, setGraphImage] = useState('/graph.png');
	return (
		<div className={styles.marketsMain}>
			<div className={styles.marketsContainer}>
				<button onClick={() => setGraphImage('/graph.png')}>NASDAQ</button>
				<button onClick={() => setGraphImage('/graph2.png')}>NYSE</button>
				<button onClick={() => setGraphImage('/graph3.png')}>SSe</button>
				<button onClick={() => setGraphImage('/graph4.png')}>euronext</button>
			</div>
			<Image
				src={graphImage}
				alt='Stock Market'
				width={300}
				height={200}
			/>
			<div className={styles.marketsStatus}>
				<div>
					<div className={styles.marketsStatusSpan}>
						<span>High:</span>
						<span>$10.000</span>
					</div>
					<div className={styles.marketsStatusSpan}>
						<span>Low:</span>
						<span>$8.000</span>
					</div>
				</div>
				<div>
					<div className={styles.marketsStatusSpan}>
						<span>Open:</span>
						<span>$9.000</span>
					</div>
					<div className={styles.marketsStatusSpan}>
						<span>Close:</span>
						<span>$10.000</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default StockMarkets;
