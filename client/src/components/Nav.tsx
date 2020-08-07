import React, { Component } from "react";

import "../style/Nav.css";

type NavProps = {
	username: string;
};
type NavState = {};

class Card extends Component<NavProps, NavState> {
	constructor(props: NavProps) {
		super(props);
	}

	render() {
		return (
			<div id="nav">
				<ul>
					<a>Home</a>
					<a>About</a>
				</ul>
			</div>
		);
	}
}

export default Card;
