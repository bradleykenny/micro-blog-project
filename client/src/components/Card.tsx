import React, { useState } from "react";
import dateformat from "dateformat";
import BCard from "react-bootstrap/Card";

import "../style/Card.css";

type CardProps = {
	username: string;
	text: string;
	likes: number;
	avatar: string;
	timestamp: string;
};

export const Card = (props: CardProps) => {
	const [likes, setLikes] = useState(props.likes);

	const handleLike = () => {
		setLikes(likes + 1);
	};

	const ts: number = Date.parse(props.timestamp);
	const formatDate: string = dateformat(ts, "h:MMtt | dS mmm yyyy");

	return (
		<BCard>
			<a href={"/profile/" + props.username}>
				<img src={props.avatar} />
			</a>
			<div className="card_text">
				<h2>@{props.username}</h2>
				<p dangerouslySetInnerHTML={{ __html: props.text }}></p>
				<ul>
					<a onClick={handleLike}>Like ({likes})</a>
					<a>More</a>
				</ul>
				<h6>{formatDate}</h6>
			</div>
		</BCard>
	);
};
