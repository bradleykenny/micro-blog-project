import React, { Component } from "react";

import "../style/Card.css";

type CardProps = {
	username: string;
	text: string;
};
type CardState = {};

class Card extends Component<CardProps, CardState> {
	constructor(props: CardProps) {
		super(props);
	}

	render() {
		return (
			<div className="card">
				<h2>@{this.props.username}</h2>
				<p>{this.props.text}</p>
			</div>
		);
	}
}

export default Card;
