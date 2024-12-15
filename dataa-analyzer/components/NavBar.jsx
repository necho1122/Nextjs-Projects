import React from 'react';
import Link from 'next/link';
import styles from './NavBar.module.css';

function NavBar() {
	return (
		<div className={styles.navBarContainer}>
			<nav className={styles.navBar}>
				<Link href='/'>Home</Link>
				<Link href='/cards'>Cards</Link>
				<Link href='/login'>Login</Link>
				<Link href='/register'>Register</Link>
				<Link href='/dashboard'>Dashboard</Link>
			</nav>
		</div>
	);
}

export default NavBar;
