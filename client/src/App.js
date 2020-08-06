import React from "react";
import "./App.css";

import Card from "./components/Card";

function App() {
	return (
		<div className="App">
			<Card username="bradley" text="Hey there." />
			<p>Some text here.</p>
		</div>
	);
}

export default App;
