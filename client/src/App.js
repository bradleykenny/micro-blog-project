import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Container from "react-bootstrap/Container";
import { CardList, NavBar, Login } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
	const [user, setUser] = useState(null);

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/home">
						<NavBar />
						<Container style={{ paddingTop: "100px" }}>
							<CardList />
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
						<Login user={user} setUser={setUser} />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
