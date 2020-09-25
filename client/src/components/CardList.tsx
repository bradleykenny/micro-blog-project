import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./";

type CardListProps = {};

export const CardList = (props: CardListProps) => {
	const [cards, setCards] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:5000/posts/10").then((response) => {
			setCards(response.data);
			response.data.forEach((post: any) => {
				axios
					.get("http://localhost:5000/user/" + post.user)
					.then((res) => {
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
