import React from "react";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router";

import "../style/Nav.css";

type NavProps = {
	username: string;
};

export const NavBar = (props: NavProps) => {
	const history = useHistory();

	const handleLogout = () => {
		localStorage.removeItem("user");
		history.push("/home");
	};

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
			{props.username ? (
				<>
					<Nav.Item>
						<Nav.Link eventKey="3" href="/profile">
							@{props.username}
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							eventKey="3"
							href="/home"
							onClick={handleLogout}
						>
							Logout
						</Nav.Link>
					</Nav.Item>
				</>
			) : (
				<Nav.Item>
					<Nav.Link eventKey="3" href="/login">
						Login
					</Nav.Link>
				</Nav.Item>
			)}
		</Nav>
	);
};
