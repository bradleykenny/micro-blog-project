import React from "react";
import "./App.css";

import Card from "./components/Card";

const App = () => {
	return (
		<div className="App">
			<Card username="bradleykenny" text="Some sample text." />
		</div>
	);
};

export default App;
