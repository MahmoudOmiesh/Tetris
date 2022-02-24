import { placedPieces } from './piece.js';
import { GRID_ROWS, GRID_COLUMNS } from './game.js';

export function getRandom(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

export function isPieceTouchingBottom(pieces) {
	const yValues = pieces.map(a => a.y);
	const maxYValue = Math.max(...yValues);
	if (
		maxYValue + 1 > GRID_ROWS ||
		pieces.some(s => {
			return placedPieces.some(p => {
				return s.y + 1 === p.y && s.x === p.x;
			});
		})
	) {
		return true;
	}
}

export function isPieceTouchingRight(pieces) {
	const xValuesCurrent = pieces.map(a => a.x);
	const maxXValueCurrent = Math.max(...xValuesCurrent);
	if (
		maxXValueCurrent + 1 > GRID_COLUMNS ||
		pieces.some(s => {
			return placedPieces.some(p => {
				return s.x + 1 === p.x && s.y === p.y;
			});
		})
	) {
		return true;
	}
}

export function isPieceTouchingLeft(pieces) {
	const xValuesCurrent = pieces.map(a => a.x);
	const minXValueCurrent = Math.min(...xValuesCurrent);
	if (
		minXValueCurrent - 1 < 1 ||
		pieces.some(s => {
			return placedPieces.some(p => {
				return s.x - 1 === p.x && s.y === p.y;
			});
		})
	) {
		return true;
	}
}

export function isPieceTouchingTop(pieces) {
	const topPieces = placedPieces.filter(a => a.y === 1);
	if (
		pieces.some(s => {
			return topPieces.some(p => {
				return p.y === s.y && p.x === s.x;
			});
		})
	)
		return true;
}
