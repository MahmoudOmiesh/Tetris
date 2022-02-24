import {
	getRandom,
	isPieceTouchingBottom,
	isPieceTouchingLeft,
	isPieceTouchingRight,
	isPieceTouchingTop,
} from './utilities.js';

import {
	GRID_ROWS,
	GRID_COLUMNS,
	loseGame,
	updateScore,
	updateLines,
} from './game.js';

const tetrisGrid = document.querySelector('.tetris');
const pieceNames = [
	'i-block',
	'j-block',
	'l-block',
	'o-block',
	's-block',
	't-block',
	'z-block',
];
const pieceColors = [
	'red',
	'purple',
	'green',
	'yellow',
	'cyan',
	'blue',
	'green',
];

let currentPieceName = '';
let currentPieceColor = '';
let nextPieceName = '';
let nextPieceColor = '';
export let placedPieces = [];
export let currentPieceCoords = [];

export function movePiece(dir) {
	switch (dir) {
		case 'down':
			currentPieceCoords.forEach(square => {
				square.y = square.y + 1;
				square.element.style.gridRow = square.y;
			});
			break;
		case 'right':
			currentPieceCoords.forEach(square => {
				square.x = square.x + 1;
				square.element.style.gridColumn = square.x;
			});
			break;
		case 'left':
			currentPieceCoords.forEach(square => {
				square.x = square.x - 1;
				square.element.style.gridColumn = square.x;
			});
			break;
	}
}

export function initPiece() {
	if (isPieceTouchingTop(currentPieceCoords)) loseGame();
	getNewPiece();
	drawNextPiece();
	drawPiece();
}

export function startPieceInteraction() {
	document.addEventListener('keydown', e => {
		if (e.key === 'ArrowRight' && !isPieceTouchingRight(currentPieceCoords))
			movePiece('right');
		else if (e.key === 'ArrowLeft' && !isPieceTouchingLeft(currentPieceCoords))
			movePiece('left');
		else if (
			e.key === 'ArrowDown' &&
			!isPieceTouchingBottom(currentPieceCoords)
		)
			movePiece('down');
		else if (e.key === 'ArrowUp') rotatePiece();
	});
}

export function checkForRow() {
	for (let i = 1; i <= GRID_ROWS; i++) {
		const rowPieces = placedPieces.filter(piece => piece.y === i);
		if (rowPieces.length === GRID_COLUMNS) {
			updateScore();
			updateLines();
			deletePieces(rowPieces);
			shiftPiecesDown(i);
		}
	}
}

function shiftPiecesDown(row) {
	const abovePieces = placedPieces.filter(piece => piece.y < row);
	abovePieces.forEach(piece => {
		piece.y = piece.y + 1;
		piece.element.style.gridRow = piece.y;
	});
}

function deletePieces(pieces) {
	pieces.forEach(a => {
		a.element.remove();
		placedPieces = placedPieces.filter(b => b.element !== a.element);
	});
}

function rotatePiece() {
	if (
		currentPieceCoords.some(piece => {
			const { x, y } = getRotationCoords(piece);
			return (
				isPieceTouchingRight([{ x: x - 1, y }]) ||
				isPieceTouchingLeft([{ x: x + 1, y }]) ||
				isPieceTouchingBottom([{ x, y: y - 1 }])
			);
		}) ||
		currentPieceName === 'o-block'
	)
		return;
	currentPieceCoords.forEach(piece => {
		const { x, y } = getRotationCoords(piece);
		piece.x = x;
		piece.y = y;
		piece.element.style.gridRow = piece.y;
		piece.element.style.gridColumn = piece.x;
	});
}

function getRotationCoords(piece) {
	const { x: pivotX, y: pivotY } = currentPieceCoords[0];
	const relativeX = piece.x - pivotX;
	const relativeY = piece.y - pivotY;
	const newX = -1 * relativeY + pivotX;
	const newY = relativeX + pivotY;
	return { x: newX, y: newY };
}

function getNewPiece() {
	currentPieceName = nextPieceName || getRandom(pieceNames);
	currentPieceColor = nextPieceColor || getRandom(pieceColors);
	nextPieceName = getRandom(pieceNames);
	nextPieceColor = getRandom(pieceColors);
	currentPieceCoords = getPieceCoords();
}

function drawPiece() {
	currentPieceCoords.forEach(({ x, y, element }) => {
		element.classList.add('piece');
		element.dataset.pieceColor = currentPieceColor;
		element.style.gridRow = y;
		element.style.gridColumn = x;
		tetrisGrid.appendChild(element);
	});
}

function drawNextPiece() {
	const nextPieceELem = document.querySelector('.nextpiece');
	const nextPieces = nextPieceELem.querySelectorAll('.piece');
	nextPieceELem.dataset.pieceName = nextPieceName;
	nextPieces.forEach(p => (p.dataset.pieceColor = nextPieceColor));
}

function getPieceCoords() {
	//pivot point at index 0 for each piece
	switch (currentPieceName) {
		case 'i-block':
			return [
				{ x: 5, y: 1, element: document.createElement('div') },
				{ x: 4, y: 1, element: document.createElement('div') },
				{ x: 6, y: 1, element: document.createElement('div') },
				{ x: 7, y: 1, element: document.createElement('div') },
			];
			break;
		case 'j-block':
			return [
				{ x: 5, y: 2, element: document.createElement('div') },
				{ x: 4, y: 1, element: document.createElement('div') },
				{ x: 4, y: 2, element: document.createElement('div') },
				{ x: 6, y: 2, element: document.createElement('div') },
			];
			break;
		case 'l-block':
			return [
				{ x: 5, y: 2, element: document.createElement('div') },
				{ x: 6, y: 1, element: document.createElement('div') },
				{ x: 4, y: 2, element: document.createElement('div') },
				{ x: 6, y: 2, element: document.createElement('div') },
			];
			break;
		case 'o-block':
			return [
				{ x: 5, y: 1, element: document.createElement('div') },
				{ x: 6, y: 1, element: document.createElement('div') },
				{ x: 5, y: 2, element: document.createElement('div') },
				{ x: 6, y: 2, element: document.createElement('div') },
			];
			break;
		case 's-block':
			return [
				{ x: 6, y: 2, element: document.createElement('div') },
				{ x: 6, y: 1, element: document.createElement('div') },
				{ x: 7, y: 1, element: document.createElement('div') },
				{ x: 5, y: 2, element: document.createElement('div') },
			];
			break;
		case 't-block':
			return [
				{ x: 5, y: 2, element: document.createElement('div') },
				{ x: 4, y: 2, element: document.createElement('div') },
				{ x: 6, y: 2, element: document.createElement('div') },
				{ x: 5, y: 1, element: document.createElement('div') },
			];
			break;
		case 'z-block':
			return [
				{ x: 6, y: 2, element: document.createElement('div') },
				{ x: 7, y: 2, element: document.createElement('div') },
				{ x: 5, y: 1, element: document.createElement('div') },
				{ x: 6, y: 1, element: document.createElement('div') },
			];
	}
}
