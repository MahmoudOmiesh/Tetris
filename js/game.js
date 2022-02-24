import {
	movePiece,
	initPiece,
	startPieceInteraction,
	currentPieceCoords,
	placedPieces,
	checkForRow,
} from './piece.js';
import { isPieceTouchingBottom } from './utilities.js';

export const GRID_ROWS = 18;
export const GRID_COLUMNS = 10;
const GAME_SPEED = 2;
let prevTime = 0;
let isGameLost = false;

function gameLoop(currentTime) {
	if (isGameLost) return;
	window.requestAnimationFrame(gameLoop);
	const delta = (currentTime - prevTime) / 1000;
	if (delta < 1 / GAME_SPEED) return;
	prevTime = currentTime;

	if (isPieceTouchingBottom(currentPieceCoords)) {
		placedPieces.push(...currentPieceCoords);
		checkForRow();
		initPiece();
	} else {
		movePiece('down');
	}
}

function startGame() {
	initPiece();
	startPieceInteraction();
	window.requestAnimationFrame(gameLoop);
}

export function loseGame() {
	isGameLost = true;
}

export function updateScore() {
	const scoreElem = document.querySelector('[data-score]');
	scoreElem.textContent = +scoreElem.textContent + 40;
}

export function updateLines() {
	const linesElem = document.querySelector('[data-lines]');
	linesElem.textContent = +linesElem.textContent + 1;
}

startGame();
