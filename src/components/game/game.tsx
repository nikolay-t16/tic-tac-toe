import React from "react";
import "./game.scss";

import GameCell from "../gameCell/gameCell";
import Model from "../../model/Model";

type GameState = {
	height: number,
	cells: (null | string)[],
};

class Game extends React.Component {

	private readonly MAX_WIDTH = 400;
	private readonly MIN_WIDTH = 320;

	public readonly state: GameState;

	constructor(props: {}) {
		super(props);
		const width = document.documentElement.clientWidth;
		const height = this.calculateHeight(width);
		this.state = {
			height,
			cells: [null, null, null, null, null, null, null, null, null],
		};
	}

	private onResize() {
		const width = document.documentElement.clientWidth;
		const height = this.calculateHeight(width);
		this.setState({height});
	}

	public componentDidMount() {
		window.addEventListener("resize", () => this.onResize());
	}

	public componentWillUnmount() {
		window.removeEventListener("resize", () => this.onResize());
	}


	private calculateHeight = (width: number): number => {
		if (width > this.MAX_WIDTH) {
			return this.MAX_WIDTH;
		}
		if (width < this.MIN_WIDTH) {
			return this.MIN_WIDTH;
		}
		return width;
	}

	async onCellClick(cellNumber: number) {
		if (this.state.cells[cellNumber]) {
			return;
		}
		const newCells = [...this.state.cells];
		newCells[cellNumber] = GameCell.SYMBOL_CROSS;
		await this.setState({cells: newCells});
		await this.makeComputerMove();
	}

	protected async makeComputerMove() {
		const moveForComputer = Model.getMoveForComputer(this.state.cells);
		const newCells = [...this.state.cells];
		newCells[moveForComputer] = GameCell.SYMBOL_ZERO;
		await this.setState({cells: newCells});
	}


	render() {
		const cells: {}[] = [];
		this.state.cells.forEach((e, i) => cells.push(
			<div
				className="game__cell"
				key={i} data-num={i}
			>
				<GameCell
					number={i}
					onClick={this.onCellClick.bind(this)}
					icon={this.state.cells[i]}
				/>
			</div>));

		return (
			<div className="game" style={{height: `${this.state.height}px`}}>
				{cells}
			</div>
		);
	}
}

export default Game;
