import React from "react";
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
				<Nav.Link href="/about">About</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				{props.username ? (
					<Nav.Link eventKey="3" href="/profile">
						@{props.username}
					</Nav.Link>
				) : (
					<Nav.Link eventKey="3" href="/login">
						Login
					</Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	);
};
