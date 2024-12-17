import React from 'react';
import styles from './UserAssets.module.css';

function UserAssets() {
	return (
		<div className={styles.userAssetsComponents}>
			<div>
				<h4>Balance</h4>
				<div className={styles.balance}>
					<div className={styles.balanceAssets}>$15,000,00</div>
					<div className={styles.balanceChange}>+5%</div>
				</div>
			</div>

			<div>
				<h4>invested</h4>
				<div>
					<div className={`${styles.balance} ${styles.otherInvest}`}>
						$8,000,00
						<button>{'>'}</button>
					</div>
				</div>
			</div>
			<div>
				<h4>Top Stock</h4>
				<div>
					<div className={`${styles.balance} ${styles.otherInvest}`}>
						Apple Inc.
						<button>{'>'}</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserAssets;
