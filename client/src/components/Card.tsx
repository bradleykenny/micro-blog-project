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
	const [liked, setLiked] = useState(false);

	const handleLiked = () => {
		setLiked(!liked);
	};

	const ts: number = Date.parse(props.timestamp);
	const formatDate: string = dateformat(ts, "h:MMtt | dS mmm yyyy");

	return (
		<BCard>
			<a href={"/profile/" + props.username}>
				<img alt="Avatar" src={props.avatar} />
			</a>
			<div className="card_text">
				<h2>@{props.username}</h2>
				<p dangerouslySetInnerHTML={{ __html: props.text }}></p>
				<ul>
					<p onClick={handleLiked}>{liked ? "Unlike" : "Like"}</p>
					<p> More</p>
				</ul>
				<h6>{formatDate}</h6>
			</div>
		</BCard>
	);
};
