import React, { useState } from "react";
import BCard from "react-bootstrap/Card";

import "../style/Card.css";

type CardProps = {
	username: string;
	text: string;
	likes: number;
	avatar: string;
};

export const Card = (props: CardProps) => {
	const [likes, setLikes] = useState(props.likes);

	const handleLike = () => {
		setLikes(likes + 1);
	};

	return (
		<BCard>
			<img src={props.avatar} />
			<div className="card_text">
				<h2>@{props.username}</h2>
				<p dangerouslySetInnerHTML={{ __html: props.text }}></p>
				<ul>
					<a onClick={handleLike}>Like ({likes})</a>
					<a>More</a>
				</ul>
			</div>
		</BCard>
	);
};
