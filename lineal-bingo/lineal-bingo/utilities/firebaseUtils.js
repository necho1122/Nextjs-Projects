// utilities/firebaseUtils.js
import { ref, set, onValue } from '@/lib/firebase';

export function updateGameStateInFirebase(database, gameState) {
	const gameStateRef = ref(database, 'gameState');
	set(gameStateRef, gameState);
}

export function fetchGameStateFromFirebase(database, onDataFetched) {
	const gameStateRef = ref(database, 'gameState');
	onValue(gameStateRef, (snapshot) => {
		onDataFetched(snapshot.val());
	});
}
