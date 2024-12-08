import React from 'react';
import styles from './page.module.css';
import UserPanel from '@/components/UserPanel';
import StockTickers from '@/components/StockTickers';
import UserAssets from '@/components/UserAssets';

async function Cards() {
	return (
		<div className={styles.dashboardContainer}>
			<UserPanel />
			<div>
				<StockTickers />
				<UserAssets />
			</div>
		</div>
	);
}

export default Cards;
