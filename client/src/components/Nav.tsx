import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";

import "../style/Nav.css";

type NavProps = {
	username: string;
};
type NavState = {};

export class NavBar extends Component<NavProps, NavState> {
	render() {
		return (
			<Nav variant="pills" activeKey="1" id="nav">
				<a href="#" className="logo">
					<span className="logo_m">micro</span>
					<span className="logo_b">blog</span>
				</a>
				<Nav.Item>
					<Nav.Link eventKey="1" href="#/home">
						Home
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="2" title="Item">
						About
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="3">Profile</Nav.Link>
				</Nav.Item>
			</Nav>
		);
	}
}
