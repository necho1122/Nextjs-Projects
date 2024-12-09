import React from 'react';
import styles from './page.module.css';
import UserPanel from '@/components/UserPanel';
import StockTickers from '@/components/StockTickers';
import UserAssets from '@/components/UserAssets';
import StockMarkets from '@/components/StockMarkets';

async function Cards() {
	return (
		<div className={styles.dashboardContainer}>
			<UserPanel />
			<div className={styles.secondCardsContainer}>
				<StockTickers />
				<div className={styles.secondCards}>
					<UserAssets />
					<StockMarkets />
				</div>
			</div>
		</div>
	);
}

export default Cards;
