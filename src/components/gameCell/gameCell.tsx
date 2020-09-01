import React from 'react';
import './gameCell.scss';
import Model from "../../model/Model";

type GameCellProps = {
	icon: number,
	onClick: (key: number) => void,
	number: number,
};

class GameCell extends React.Component {

	private readonly ICON_CROSS = 'x.png';
	private readonly ICON_ZERO = 'o.png';

	public get iconFileName() {
		if (this.props.icon === Model.SYMBOL_CROSS) {
			return this.ICON_CROSS;
		}
		if (this.props.icon === Model.SYMBOL_ZERO) {
			return this.ICON_ZERO;
		}
		return '';
	}

	constructor(public props: GameCellProps) {
		super(props);
	}

	onClick() {
		this.props.onClick(this.props.number);
	}

	render() {
		return <div onClick={() => this.onClick()} className="game-cell">
			{this.props.icon !== Model.SYMBOL_EMPTY && <img className="game-cell__icon" alt={this.iconFileName} src={require(`../../assets/${this.iconFileName}`)}/>}
		</div>;
	}
}

export default GameCell;
