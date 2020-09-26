import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import "./App.css";

import Container from "react-bootstrap/Container";
import { CardList, NavBar, Login, Home } from "./components";
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
			<NavBar username={user ? user.username : ""} />
			<Router>
				<Switch>
					<Route path="/home">
						<Home user={user} />
					</Route>
					<Route path="/about">
						<Container style={{ paddingTop: "100px" }}>
							<CardList />
						</Container>
					</Route>
					<Route path="/profile">
						<Container style={{ paddingTop: "100px" }}>
							<CardList />
						</Container>
					</Route>
					<Route path="/login">
						<Container style={{ paddingTop: "100px" }}>
							<Login user={user} setUser={setUser} />
						</Container>
					</Route>

					{/* ALWAYS LEAVE `/` LAST */}
					<Route path="/">
						<Redirect to="/home" />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
