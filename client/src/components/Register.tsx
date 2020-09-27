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
import "../style/Login.css";

import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";

type RegisterProps = {
	user: JWT;
	setUser: Function;
};

export const Register = (props: RegisterProps) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");

	const history = useHistory();

	const { user, setUser } = props;

	const handleRegister = (e: any) => {
		e.preventDefault();
		axios
			.post("/api/register", {
				username,
				password,
				password2,
			})
			.then((response) => {
				axios
					.post("/api/login", {
						username,
						password,
					})
					.then((response2) => {
						setUser(response2.data);
						localStorage.setItem(
							"user",
							JSON.stringify(response2.data)
						);
						history.push("/home");
					})
					.catch((err) => console.log(err));
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
						<BForm onSubmit={handleRegister}>
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
							<BForm.Group controlId="formBasicPassword">
								<BForm.Label>Confirm password</BForm.Label>
								<BForm.Control
									type="password"
									placeholder="Confirm password"
									value={password2}
									onChange={(e) =>
										setPassword2(e.target.value)
									}
								/>
							</BForm.Group>
							<BButton variant="primary" type="submit" block>
								Submit
							</BButton>
						</BForm>
						<BCard.Link href="/login" className="registerLink">
							Don't have an account?
						</BCard.Link>
					</BCard>
				</Col>
				<Col></Col>
			</Row>
		</Container>
	);
};
