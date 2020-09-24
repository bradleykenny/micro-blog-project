import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CardList, NavBar, Login } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const localUser = JSON.parse(localStorage.getItem("user"));
		if (localUser) {
			setUser(localUser);
		}
	}, []);

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/home">
						<NavBar />
						<Container style={{ paddingTop: "100px" }}>
							<Row>
								<Col></Col>
								<Col xs={6}>
									<CardList />
								</Col>
								<Col></Col>
							</Row>
						</Container>
					</Route>
					<Route path="/about">
						<NavBar />
						<Container style={{ paddingTop: "100px" }}>
							<CardList />
						</Container>
					</Route>
					<Route path="/profile">
						<NavBar />
						<Container style={{ paddingTop: "100px" }}>
							<CardList />
						</Container>
					</Route>
					<Route path="/login">
						<NavBar username={user ? user.id : ""} />
						<Container style={{ paddingTop: "100px" }}>
							<Login user={user} setUser={setUser} />
						</Container>
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
