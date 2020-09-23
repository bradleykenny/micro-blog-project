import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Container from "react-bootstrap/Container";
import { CardList, NavBar } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
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
				</Switch>
			</Router>
		</div>
	);
};

export default App;
