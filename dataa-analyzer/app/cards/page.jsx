import React from 'react';
import styles from './page.module.css';
import UserPanel from '@/components/UserPanel';
import StockTickers from '@/components/StockTickers';
import UserAssets from '@/components/UserAssets';
import StockMarkets from '@/components/StockMarkets';
import HotStocks from '@/components/HotStocks';
import Image from 'next/image';

async function Cards() {
	return (
		<div className={styles.dashboardContainer}>
			<UserPanel />
			<div className={styles.secondCardsContainer}>
				<StockTickers />
				<div className={styles.secondCards}>
					<UserAssets />
					<StockMarkets />
					<HotStocks />
				</div>
				<div>
					<Image
						src='/dashboard.webp'
						alt='Stock Market'
						width={800}
						height={500}
					/>
				</div>
			</div>
		</div>
	);
}

export default Cards;
