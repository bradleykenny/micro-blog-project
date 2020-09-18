import React, { useState } from "react";
import BCard from "react-bootstrap/Card";

import "../style/Card.css";

type CardProps = {
	username: string;
	text: string;
	likes: number;
};

export const Card = (props: CardProps) => {
	const [likes, setLikes] = useState(props.likes);

	const handleLike = () => {
		setLikes(likes + 1);
	};

	return (
		<BCard>
			<img src="http://robohash.org/jim" />
			<div className="card_text">
				<h2>@{props.username}</h2>
				<p>{props.text}</p>
				<ul>
					<a onClick={handleLike}>Like ({likes})</a>
					<a>More</a>
				</ul>
			</div>
		</BCard>
	);
};
