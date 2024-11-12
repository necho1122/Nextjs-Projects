import styles from './page.module.css';
import VerificationPage from '@/components/verificationPage';
import Header from '@/components/Header';

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<Header />
				<VerificationPage />
			</main>
			<footer className={styles.footer}></footer>
		</div>
	);
}
