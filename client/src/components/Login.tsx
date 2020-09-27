import React, { useState } from "react";
import axios from "axios";

import BCard from "react-bootstrap/Card";
import BForm from "react-bootstrap/Form";
import BButton from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import { JWT } from "../types/JWT";

import "../style/Card.css";
import "../style/Login.css";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";

type LoginProps = {
	user: JWT;
	setUser: Function;
};

export const Login = (props: LoginProps) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const history = useHistory();

	const { user, setUser } = props;

	const handleLogin = (e: any) => {
		e.preventDefault();
		axios
			.post("http://localhost:5000/api/login", { username, password })
			.then((response) => {
				setUser(response.data);
				localStorage.setItem("user", JSON.stringify(response.data));
				history.push("/home");
			})
			.catch((error) => {
				if (error.response.status === 401) {
					setError(true);
				}
			});
	};

	if (user) {
		return <Redirect to="/home" />;
	}

	return (
		<Container>
			<Row>
				<Col></Col>
				<Col xs={6}>
					<BCard>
						<BForm onSubmit={handleLogin}>
							{error && (
								<Alert variant="danger">
									Username and/or password incorrect.
								</Alert>
							)}
							<BForm.Group controlId="formBasicEmail">
								<BForm.Label>Username</BForm.Label>
								<BForm.Control
									type="text"
									placeholder="Enter username"
									onChange={(e) =>
										setUsername(e.target.value)
									}
								/>
							</BForm.Group>
							<BForm.Group controlId="formBasicPassword">
								<BForm.Label>Password</BForm.Label>
								<BForm.Control
									type="password"
									placeholder="Enter password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</BForm.Group>
							<BButton variant="primary" type="submit" block>
								Submit
							</BButton>
						</BForm>
						<BCard.Link href="/register" className="registerLink">
							Don't have an account?
						</BCard.Link>
					</BCard>
				</Col>
				<Col></Col>
			</Row>
		</Container>
	);
};
