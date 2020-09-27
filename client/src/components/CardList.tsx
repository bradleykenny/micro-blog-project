import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./";

type CardListProps = {};

export const CardList = (props: CardListProps) => {
	const [cards, setCards] = useState([]);

	useEffect(() => {
		axios.get("/api/posts/10").then((response) => {
			setCards(response.data);
			response.data.forEach((post: any) => {
				axios.get("/api/user/" + post.user).then((res) => {
					const { avatar, follows, username } = res.data;
					const temp = { avatar, follows, username };

					post.user = temp;
				});
			});
		});
	}, []);

	return (
		<>
			{cards.map((c: any) => (
				<Card
					username={c.user}
					text={c.content}
					likes={0}
					avatar={c.avatar}
					timestamp={c.timestamp}
				/>
			))}
		</>
	);
};
