import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./";
import { Button } from "react-bootstrap";

type ProfileProps = {};

export const Profile = (props: ProfileProps) => {
	const [cards, setCards] = useState([]);
	const [postsCount, setPostsCount] = useState(10);

	useEffect(() => {
		try {
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
		} catch (error) {
			console.error(error);
		}
	}, [postsCount]);

	const handleLoad = () => {
		setPostsCount(postsCount + 10);
	};

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
			<Button onClick={handleLoad} style={{ marginBottom: "15px" }}>
				Load More
			</Button>
		</>
	);
};
