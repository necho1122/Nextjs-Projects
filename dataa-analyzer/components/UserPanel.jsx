import React from 'react';
import styles from './UserPanel.module.css';
import Link from 'next/link';
import Image from 'next/image';

function UserPanel() {
	return (
		<aside className={styles.userPanel}>
			<Link
				href='/dashboard'
				className={styles.linkStyle}
			>
				<Image
					src='https://cdn-icons-png.flaticon.com/512/1828/1828791.png'
					alt='Dasboard Icon'
					width={20}
					height={20}
				/>
				Dashboard
			</Link>
			<Link
				href='/portfolio'
				className={styles.linkStyle}
			>
				<Image
					src='https://cdn-icons-png.flaticon.com/512/9077/9077994.png'
					alt='Portfolio Icon'
					width={20}
					height={20}
				/>
				Portfolio
			</Link>
			<Link
				href='/trading'
				className={styles.linkStyle}
			>
				<Image
					src='https://cdn-icons-png.flaticon.com/512/9155/9155737.png'
					alt='Trading Icon'
					width={20}
					height={20}
				/>
				Trading & Market
			</Link>
			<Link
				href='/wallet'
				className={styles.linkStyle}
			>
				<Image
					src='https://cdn-icons-png.flaticon.com/512/60/60484.png'
					alt='Wallet Icon'
					width={20}
					height={20}
				/>
				Wallet
			</Link>
			<Link
				href='/transactions'
				className={styles.linkStyle}
			>
				<Image
					src='https://cdn-icons-png.flaticon.com/512/5681/5681355.png'
					alt='Transactions Icon'
					width={20}
					height={20}
				/>
				Transactions
			</Link>
			<Link
				href='/settings'
				className={styles.linkStyle}
			>
				<Image
					src='https://cdn-icons-png.flaticon.com/512/3019/3019014.png'
					alt='Settings Icon'
					width={20}
					height={20}
				/>
				Settings
			</Link>
		</aside>
	);
}

export default UserPanel;
