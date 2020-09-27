import React, { useState } from "react";
import dateformat from "dateformat";
import BCard from "react-bootstrap/Card";
import { useHistory } from "react-router";

import "../style/Card.css";
import { JWT } from "../types/JWT";
import axios from "axios";

type CardProps = {
	username: string;
	text: string;
	likes: string[];
	avatar: string;
	timestamp: string;
	id: string;
};

export const Card = (props: CardProps) => {
	const curUser: JWT = JSON.parse(localStorage.getItem("user") || "{}");
	const [liked, setLiked] = useState(
		props.likes.includes(curUser.username) ? true : false
	);
	const history = useHistory();

	const handleLiked = () => {
		axios
			.post("/api/posts/" + props.id + "/like", {
				user: props.username,
			})
			.then((res) => {
				setLiked(!liked);
			});
	};

	const handleMore = () => {
		history.push("/post/" + props.id);
	};

	const ts: number = Date.parse(props.timestamp);
	const formatDate: string = dateformat(ts, "h:MMtt | dS mmm yyyy");

	return (
		<BCard>
			<a href={"/profile/" + props.username}>
				<img alt="Avatar" src={props.avatar} />
			</a>
			<div className="card_text">
				<a href={"/profile/" + props.username}>
					<h2>@{props.username}</h2>
				</a>
				<p dangerouslySetInnerHTML={{ __html: props.text }}></p>
				<ul>
					<p onClick={handleLiked}>{liked ? "Unlike" : "Like"}</p>
					<p onClick={handleMore}>More</p>
				</ul>
				<h6>{formatDate}</h6>
			</div>
		</BCard>
	);
};
