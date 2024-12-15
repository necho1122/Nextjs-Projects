import React from 'react';
import styles from './page.module.css';
import UserPanel from '@/components/UserPanel';
import StockTickers from '@/components/StockTickers';
import UserAssets from '@/components/UserAssets';
import StockMarkets from '@/components/StockMarkets';
import HotStocks from '@/components/HotStocks';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';

async function Cards() {
	return (
		<div>
			<NavBar />
			<div className={styles.dashboardContainer}>
				<UserPanel />
				<div className={styles.secondCardsContainer}>
					<StockTickers />
					<div className={styles.secondCards}>
						<UserAssets />
						<StockMarkets />
						<HotStocks />
					</div>
					<div
						className={styles.thirdCards}
						style={{ flex: 2 }}
					>
						<Image
							src='/dashboard.webp'
							alt='Stock Market'
							width={625}
							height={420}
						/>
						<SideBar />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cards;
