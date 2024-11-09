import styles from './page.module.css';
import BingoBoard from '@/components/BingoBoard';

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<h1>Bingo Lineal - Daniela</h1>
				<BingoBoard />
			</main>
			<footer className={styles.footer}></footer>
		</div>
	);
}
