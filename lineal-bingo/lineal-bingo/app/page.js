import styles from './page.module.css';
import VerificationPage from '@/components/verificationPage';
import Header from '@/components/Header';
import Image from 'next/image';

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<Header />
				<Image
					src='/bingo.png'
					alt='bingo lineal'
					width={200}
					height={200}
				/>
				<VerificationPage />
			</main>
			<footer className={styles.footer}></footer>
		</div>
	);
}
