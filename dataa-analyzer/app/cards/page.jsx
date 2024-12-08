import React from 'react';
import styles from './page.module.css';
import UserPanel from '@/components/UserPanel';
import StockTickers from '@/components/StockTickers';

async function Cards() {
	return (
		<div className={styles.dashboardContainer}>
			<UserPanel />
			<StockTickers />
		</div>
	);
}

export default Cards;
