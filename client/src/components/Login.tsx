import React, { useEffect, useState } from "react";
import axios from "axios";
import BCard from "react-bootstrap/Card";

import { JWT } from "../types/JWT";

import "../style/Card.css";

type LoginProps = {
	user: JWT;
	setUser: Function;
};

export const Login = (props: LoginProps) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { user, setUser } = props;

	const baseURL = "http://localhost:5000/";

	const handleLogin = (e: any) => {
		e.preventDefault();
		axios
			.post(baseURL + "login", { username, password })
			.then((response) => {
				setUser(response.data);
			});
	};

	return (
		<BCard>
			<form onSubmit={handleLogin}>
				<div className="row">
					<div className="four columns">
						<label htmlFor="username">
							{user ? user.id : "Username"}
						</label>
						<input
							type="text"
							name="username"
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="four columns">
						<label htmlFor="password">Password</label>
						<input
							name="password"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="three columns">
						<input type="submit" value="Login" />
					</div>
				</div>
			</form>
		</BCard>
	);
};
