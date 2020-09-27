import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./";
import { Button } from "react-bootstrap";

type CardListProps = {};

export const CardList = (props: CardListProps) => {
	const [cards, setCards] = useState([]);
	const [postsCount, setPostsCount] = useState(10);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/posts/" + postsCount)
			.then((response) => {
				setCards(response.data);
				response.data.forEach((post: any) => {
					axios
						.get("http://localhost:5000/api/user/" + post.user)
						.then((res) => {
							const { avatar, follows, username } = res.data;
							const temp = { avatar, follows, username };

							post.user = temp;
						});
				});
			});
	}, []);

	const handleLoad = () => {
		axios
			.get("http://localhost:5000/api/posts/" + (postsCount + 10))
			.then((response) => {
				setCards(response.data);
				setPostsCount(postsCount + 10);
				response.data.forEach((post: any) => {
					axios
						.get("http://localhost:5000/api/user/" + post.user)
						.then((res) => {
							const { avatar, follows, username } = res.data;
							const temp = { avatar, follows, username };

							post.user = temp;
						});
				});
			});
	};

	return (
		<>
			{cards.map((c: any) => {
				return (
					<Card
						key={c.id}
						id={c.id}
						username={c.user}
						text={c.content}
						likes={c.likes}
						avatar={c.avatar}
						timestamp={c.timestamp}
					/>
				);
			})}
			<Button onClick={handleLoad} style={{ marginBottom: "15px" }}>
				Load More
			</Button>
		</>
	);
};
