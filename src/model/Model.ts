class Model {
	/**
	 * Код с learn javascript
	 */
	protected static makeRandomNumber(min: number, max: number): number {
		// получить случайное число от (min-0.5) до (max+0.5)
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		return Math.abs(Math.round(rand));
	}


	public static getMoveForComputer(cells: (null | string)[]): number {
		// @ts-ignore
		const randMax: number = cells.reduce((total, e) => {
				const intTotal: number = total ? +total : 0;
				return !e ? (intTotal + 1).toString() : total;
			},
			0
		);
		const randomNumber: number = this.makeRandomNumber(0, randMax - 1);
		let j: number = 0;
		for (let i: number = 0; i < cells.length; i++) {
			if (!cells[i]) {
				if (j === randomNumber) {
					return i;
				}
				j++;
			}
		}
		throw Error('getMoveForComputer выполнен с ошибкой');
	}


}

export default Model
