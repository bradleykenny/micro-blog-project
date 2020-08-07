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
				<img src="http://robohash.org/jim" />
				<div className="card_text">
					<h2>@{this.props.username}</h2>
					<p>{this.props.text}</p>
					<ul>
						<a>Like</a>
						<a>More</a>
					</ul>
				</div>
			</div>
		);
	}
}

export default Card;
