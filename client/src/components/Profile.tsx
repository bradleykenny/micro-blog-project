import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";

import "../style/Profile.css";

type ProfileProps = {};

export const Profile = (props: ProfileProps) => {
	const [cards, setCards] = useState([]);
	const [postsCount, setPostsCount] = useState(10);
	const [user, setUser] = useState({
		follows: [],
		_id: "",
		username: "",
		password: "",
		avatar: "",
		__v: 0,
	});

	const [following, setFollowing] = useState(false);

	let { username } = useParams<{ username: string }>();

	useEffect(() => {
		axios.get("/api/user/" + username).then((response) => {
			setUser(response.data);
		});

		axios
			.get("/api/posts/user/" + username + "/" + postsCount)
			.then((response) => {
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

	const handleLoad = () => {
		setPostsCount(postsCount + 10);
	};

	const handleFollow = () => {
		setFollowing(!following);
	};

	return (
		<>
			<Jumbotron fluid>
				<img src={user.avatar} id="jumbo_img" />
				<h1 id="jumbo_username">@{user.username}</h1>
				<br />
				<Button size="sm">{following ? "Unfollow" : "Follow"}</Button>
			</Jumbotron>
			{cards.map((c: any) => (
				<Card
					id={c.id}
					username={c.user}
					text={c.content}
					likes={c.likes}
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
