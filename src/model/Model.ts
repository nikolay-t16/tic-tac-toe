export type CellsType = (number)[];

class Model {

	public static readonly STATUS_CONTINUE: number = 0;
	public static readonly STATUS_TIE: number = 1;
	public static readonly STATUS_PLAYER_WIN: number = 2;
	public static readonly STATUS_COMPUTER_WIN: number = 3;
	public static readonly MIN_COUNT_CELLS_FOR_WIN: number = 5;
	public static readonly CELLS_COUNT = 9;
	public static readonly SYMBOL_CROSS = 1;
	public static readonly SYMBOL_ZERO = -1;
	public static readonly SYMBOL_EMPTY = 0;

	/**
	 * Код с learn javascript
	 */
	protected static makeRandomNumber(min: number, max: number): number {
		// получить случайное число от (min-0.5) до (max+0.5)
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		return Math.abs(Math.round(rand));
	}

	protected static getUsedCellsCount(cells: CellsType) {
		return cells.reduce(
			(total, e) => {
				return e ? total + 1 : total;
			},
			0,
		);
	}

	public static getMoveForComputer(cells: CellsType): number {
		const randMax: number = cells.length - Model.getUsedCellsCount(cells);
		const randomNumber: number = Model.makeRandomNumber(0, randMax - 1);
		let j: number = 0;
		for (let i: number = 0; i < cells.length; i++) {
			if (!cells[i]) {
				if (j === randomNumber) {
					return i;
				}
				j++;
			}
		}
		throw new Error('getMoveForComputer выполнен с ошибкой');
	}

	protected static isCellChecked(cellNumber: number, cells: CellsType) {
		return cells[cellNumber] != Model.SYMBOL_EMPTY;
	}

	protected static getWinStatus(isPlayer: boolean): number {
		return isPlayer ? Model.STATUS_PLAYER_WIN : Model.STATUS_COMPUTER_WIN;
	}

	public static checkWinner(
		cells: CellsType,
		_isCellChecked = Model.isCellChecked,
		_getWinStatus = Model.getWinStatus,
	): number {
		const usedCellsCount = Model.getUsedCellsCount(cells);
		if (cells.length < Model.MIN_COUNT_CELLS_FOR_WIN) {
			return Model.STATUS_CONTINUE;
		}
		for (let i = 0; i < usedCellsCount; i++) {
			const isPlayer = cells[i] === this.SYMBOL_CROSS;
				// проверка строк
				if (i % 3 === 0) {
					const check = Model.checkLineWinner(
						i,
						cells,
						true,
						_isCellChecked,
					);
					if (check) {
						return _getWinStatus(isPlayer);
					}
				}
				// проверка столбцов
				if (i < 3) {
					const check = Model.checkLineWinner(
						i,
						cells,
						false,
						_isCellChecked,
				)
					;
					if (check) {
						return _getWinStatus(isPlayer);
					}
				}
				// проверка диаганалей
				if (i === 0 || i === 2) {
					const check = Model.checkDiagonalWinner(
						i,
						cells,
						_isCellChecked,
					);
					if (check) {
						return _getWinStatus(isPlayer);
					}
				}
		}
		if (usedCellsCount === Model.CELLS_COUNT) {
			return Model.STATUS_TIE;
		}
		return Model.STATUS_CONTINUE;
	}

	protected static checkLineWinner(
		cellNum: number,
		cells: CellsType,
		isRow: Boolean,
		_isCellChecked = Model.isCellChecked
	): boolean {
		const delta = isRow ? 1 : 3;
		const secondCellNum = cellNum + 1 * delta;
		const thirdCellNum = cellNum + 2 * delta;
		return this.checkLineForWin(
			cells,
			cellNum,
			secondCellNum,
			thirdCellNum,
		);
	}

	protected static checkDiagonalWinner(
		cellNum: number,
		cells: CellsType,
		_isCellChecked = Model.isCellChecked
	): boolean {
		const delta = -cellNum;
		const secondCellNum = cellNum + 4 + delta;
		const thirdCellNum = cellNum + 8 + 2 * delta;
		return this.checkLineForWin(
			cells,
			cellNum,
			secondCellNum,
			thirdCellNum,
		);
	}

	protected static checkLineForWin(
		cells: CellsType,
		firstCellNumber: number,
		secondCellNumber: number,
		thirdCellNumber: number
	): boolean {
		return Model.isCellChecked(firstCellNumber, cells) &&
			cells[firstCellNumber] === cells[secondCellNumber] &&
			cells[secondCellNumber] === cells[thirdCellNumber]

	}

	public static generateEmptyCells(): CellsType {
		const cells: number[] = [];
		for (let i = 0; i < Model.CELLS_COUNT; i++) {
			cells.push(Model.SYMBOL_EMPTY);
		}
		return cells;
	}


}

export default Model
