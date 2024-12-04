import React from 'react';
import styles from './UserPanel.module.css';
import Link from 'next/link';

function UserPanel() {
	return (
		<aside className={styles.userPanel}>
			<Link href='/dashboard'>Dashboard</Link>
			<Link href='/portfolio'>Portfolio</Link>
			<Link href='/trading'>Trading & Market</Link>
			<Link href='/wallet'>Wallet</Link>
			<Link href='/transactions'>Transactions</Link>
			<Link href='/settings'>Settings</Link>
		</aside>
	);
}

export default UserPanel;
