import React from 'react';
import { render } from '@testing-library/react';
import Model, {CellsType} from './Model';

class ModelTest extends Model {
	public static getWinStatus(isPlayer: boolean): number {
		return super.getWinStatus(isPlayer);
	}

	public static getUsedCellsCount(cells: CellsType) {
		return super.getUsedCellsCount(cells);
	}

	public static isCellChecked(cellNumber: number, cells: CellsType) {
		return super.isCellChecked(cellNumber, cells);
	}

	public static checkLineForWin(
		cells: CellsType,
		firstCellNumber: number,
		secondCellNumber: number,
		thirdCellNumber: number
	): boolean {
		return super.checkLineForWin(cells, firstCellNumber, secondCellNumber, thirdCellNumber);
	}

	public static checkLineWinner(
		cellNum: number,
		cells: CellsType,
		isRow: Boolean,
		_isCellChecked = Model.isCellChecked,
	) {
		return super.checkLineWinner(
			cellNum,
			cells,
			isRow,
			_isCellChecked,
		);
	}

	public static checkDiagonalWinner(
		cellNum: number,
		cells: CellsType,
		_isCellChecked = Model.isCellChecked,
	): boolean {
		return super.checkDiagonalWinner(cellNum, cells, _isCellChecked);
	}
}

test('Model: checking win status', () => {
	expect(ModelTest.getWinStatus(true)).toEqual(Model.STATUS_PLAYER_WIN);
	expect(ModelTest.getWinStatus(false)).toEqual(Model.STATUS_COMPUTER_WIN);
});

test('Model: used cells count', () => {
	const testCells1 = [Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY];
	expect(ModelTest.getUsedCellsCount(testCells1)).toEqual(0);
	const testCells2 = [Model.SYMBOL_ZERO, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY];
	expect(ModelTest.getUsedCellsCount(testCells2)).toEqual(1);
	const testCells3 = [Model.SYMBOL_CROSS, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY];
	expect(ModelTest.getUsedCellsCount(testCells3)).toEqual(1);
	const testCells4 = [Model.SYMBOL_CROSS, Model.SYMBOL_ZERO, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY, Model.SYMBOL_EMPTY];
	expect(ModelTest.getUsedCellsCount(testCells4)).toEqual(2);
});

test('Model: checking move for computer', () => {
	const testCells1 = Model.generateEmptyCells();
	const testMove1 = ModelTest.getMoveForComputer(testCells1);
	expect(testMove1).toBeGreaterThan(-1);
	expect(testMove1).toBeLessThan(testCells1.length);

	const testCells2 = Model.generateEmptyCells();
	testCells2[0] = Model.SYMBOL_CROSS;
	testCells2[1] = Model.SYMBOL_CROSS;
	testCells2[7] = Model.SYMBOL_CROSS;
	testCells2[8] = Model.SYMBOL_CROSS;

	const testMov2 = ModelTest.getMoveForComputer(testCells2);
	expect(testMov2).toBeGreaterThan(1);
	expect(testMov2).toBeLessThan(testCells2.length - 2);

	const testCells3 = [
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
	];
	expect(() => ModelTest.getMoveForComputer(testCells3)).toThrow();
});

test('Model: checking is cell checked', () => {
	const testCells = [
		Model.SYMBOL_EMPTY,
		Model.SYMBOL_EMPTY,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_ZERO,
		Model.SYMBOL_EMPTY,
		Model.SYMBOL_EMPTY,
		Model.SYMBOL_EMPTY,
		Model.SYMBOL_EMPTY,
		Model.SYMBOL_EMPTY,
	];
	expect(ModelTest.isCellChecked(1, testCells)).toBe(false);
	expect(ModelTest.isCellChecked(2, testCells)).toBe(true);
	expect(ModelTest.isCellChecked(3, testCells)).toBe(true);
});

test('Model: checking line for win', () => {
	const testWinLineCells = [
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
	]
	expect(ModelTest.checkLineForWin(testWinLineCells, 0,1,2)).toBe(true);
	const testLoseLineCells = [
		Model.SYMBOL_CROSS,
		Model.SYMBOL_ZERO,
		Model.SYMBOL_CROSS,
	];
	expect(ModelTest.checkLineForWin(testLoseLineCells, 0,1,2)).toBe(false);
});

test('Model: checking liner winner', () => {
	const testWinCells = [
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
	];
	const testNotWinCells = [
		Model.SYMBOL_CROSS,
		Model.SYMBOL_ZERO,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_ZERO,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_ZERO,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_ZERO,
		Model.SYMBOL_CROSS,
	];

	[true, false].forEach((isPlayer) => {
		[0, 3, 6].forEach((cellNum) => {
			const checkWinResult = ModelTest.checkLineWinner(cellNum, testWinCells, true, () => true);
			expect(checkWinResult).toEqual(true);

			const checkNotWinResult = ModelTest.checkLineWinner(cellNum, testNotWinCells, true, () => true);
			expect(checkNotWinResult).toEqual(false);
		});
	});
});

test('Model: checking diagonal winner', () => {
	const testWinCells = [
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
	];
	const testNotWinCells = [
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_ZERO,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
		Model.SYMBOL_CROSS,
	];

	[true, false].forEach((isPlayer) => {
		[0, 2].forEach((cellNum) => {
			const checkWinResult = ModelTest.checkDiagonalWinner(cellNum, testWinCells, () => true);
			expect(checkWinResult).toEqual(true);

			const checkNotWinResult = ModelTest.checkDiagonalWinner(cellNum, testNotWinCells, () => true);
			expect(checkNotWinResult).toEqual(false);
		});
	});
});

