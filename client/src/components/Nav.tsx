import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";

import "../style/Nav.css";

type NavProps = {
	username: string;
};

export const NavBar = (props: NavProps) => {
	return (
		<Nav variant="pills" activeKey="1" id="nav">
			<a href="/home" className="logo">
				<span className="logo_m">micro</span>
				<span className="logo_b">blog</span>
			</a>
			<Nav.Item>
				<Nav.Link eventKey="1" href="/home">
					Home
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="2" href="/about">
					About
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="3" href="/profile">
					{props.username ? "@" + props.username : "Profile"}
				</Nav.Link>
			</Nav.Item>
		</Nav>
	);
};
