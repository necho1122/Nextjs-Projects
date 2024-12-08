import React from 'react';
import styles from './UserAssets.module.css';

function UserAssets() {
	return (
		<div className={styles.userAssetsComponents}>
			<div>
				<h4>Balance</h4>
				<div className={styles.balance}>
					<div>$15,000,00</div>
					<div>+5%</div>
				</div>
			</div>

			<div>
				<h4>invested</h4>
				<div>
					<div>
						$8,000,00
						<button>{'>'}</button>
					</div>
				</div>
			</div>
			<div>
				<h4>Top Stock</h4>
				<div>
					<div>
						Apple Inc.
						<button>{'>'}</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserAssets;
