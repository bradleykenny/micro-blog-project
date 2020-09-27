import React, { useState } from "react";
import axios from "axios";

import BCard from "react-bootstrap/Card";
import BForm from "react-bootstrap/Form";
import BButton from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { JWT } from "../types/JWT";

import "../style/Card.css";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";

type LoginProps = {
	user: JWT;
	setUser: Function;
};

export const Login = (props: LoginProps) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const { user, setUser } = props;

	const handleLogin = (e: any) => {
		e.preventDefault();
		axios.post("/api/login", { username, password }).then((response) => {
			setUser(response.data);
			localStorage.setItem("user", JSON.stringify(response.data));
			history.push("/home");
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
									placeholder="Password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</BForm.Group>
							<BButton variant="primary" type="submit">
								Submit
							</BButton>
						</BForm>
					</BCard>
				</Col>
				<Col></Col>
			</Row>
		</Container>
	);
};
