import React from 'react';
import './game.scss';

const MAX_WIDTH = 400;
const MIN_WIDTH = 320;

type GameState = {height: number};

class Game extends React.Component {

	private readonly MAX_WIDTH = 400;
	private readonly MIN_WIDTH = 320;

	public readonly state:GameState;

	constructor(props: {}) {
		super(props);
		const width = document.documentElement.clientWidth;
		const height = this.calculateHeight(width);
		this.state = {height};
		window.addEventListener("resize", () => this.onResize());
	}

	private onResize() {
		const width = document.documentElement.clientWidth;
		const height = this.calculateHeight(width);
		this.setState({height});
	}

	private calculateHeight = (width: number): number => {
		if (width > MAX_WIDTH) {
			return MAX_WIDTH;
		}
		if (width < MIN_WIDTH) {
			return MIN_WIDTH;
		}
		return width;
	}

	render() {
		const cells = [];
		for (let i = 0; i < 9; i++) {
			cells.push(<div className="game__cell" key={i} data-num={i}/>);
		}

		return (
			<div className="game" style={{height: `${this.state.height}px`}}>
				{cells}
			</div>
		);
	}
}

export default Game;
