import React from "react";
import "./game.scss";

import GameCell from "../gameCell/gameCell";
import Model,{CellsType} from "../../model/Model";



type GameState = {
	isPlaying: boolean;
	height: number,
	cells: CellsType,
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
			isPlaying: true,
			cells: Model.generateEmptyCells(),
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
		if (!this.state.isPlaying) {
			return;
		}
		if (this.state.cells[cellNumber]) {
			return;
		}
		const newCells = [...this.state.cells];
		newCells[cellNumber] = Model.SYMBOL_CROSS;
		await this.setState({cells: newCells});
		this.checkGameEndAndHandleGameEnd();
		await this.makeComputerMove();
	}

	protected checkGameEndAndHandleGameEnd() {
		const gameStatus = Model.checkWinner(this.state.cells);
		if(gameStatus === Model.STATUS_CONTINUE) {
			return;
		}
		this.handleGameEnd(gameStatus);
	}

	protected async handleGameEnd(gameStatus: number) {
		await this.setState({isPlaying: false});
		setTimeout(() => {
			switch (gameStatus) {
				case Model.STATUS_TIE:
					alert('Ничья');
					return;
				case Model.STATUS_COMPUTER_WIN:
					alert('Вы проиграли');
					return;
				case Model.STATUS_PLAYER_WIN:
					alert('Вы выйграли');
					return;
			}
			throw Error('Не верный статус');
		}, 100);


	}


	protected async makeComputerMove() {
		if (!this.state.isPlaying) {
			return;
		}
		try {
			const moveForComputer = Model.getMoveForComputer(this.state.cells);
			const newCells = [...this.state.cells];
			newCells[moveForComputer] = Model.SYMBOL_ZERO;
			await this.setState({cells: newCells});
			this.checkGameEndAndHandleGameEnd();
		} catch (e) {
			console.error(e);
		}
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
