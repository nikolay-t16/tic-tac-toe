import React from 'react';
import './gameCell.scss';

type GameCellProps = {
	icon: null | string,
	onClick: (key: number) => void,
	number: number,
};

class GameCell extends React.Component {

	private readonly ICON_CROSS = 'x.png';
	private readonly ICON_ZERO = 'o.png';

	public static readonly SYMBOL_CROSS = 'x';
	public static readonly SYMBOL_ZERO = 'o';

	public get iconFileName() {
		if (this.props.icon === GameCell.SYMBOL_CROSS) {
			return this.ICON_CROSS;
		}
		if (this.props.icon === GameCell.SYMBOL_ZERO) {
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
			{this.props.icon && <img className="game-cell__icon" alt={this.iconFileName} src={require(`../../assets/${this.iconFileName}`)}/>}
		</div>;
	}
}

export default GameCell;
