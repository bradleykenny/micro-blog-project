import React from "react";
import "./App.css";

import Container from "react-bootstrap/Container";
import { Card, CardList, NavBar } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
	return (
		<div className="App">
			<NavBar />
			<Container style={{ paddingTop: "100px" }}>
				<CardList />
			</Container>
		</div>
	);
};

export default App;
