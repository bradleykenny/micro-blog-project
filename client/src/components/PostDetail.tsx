import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

type PostDetailProps = {};

export const PostDetail = (props: PostDetailProps) => {
	const { id } = useParams<{ id: string }>();

	const [post, setPost] = useState({
		likes: [],
		_id: "",
		id: "",
		user: {
			avatar: "",
			follows: [],
			username: "",
		},
		timestamp: "",
		content: "",
		__v: 0,
	});

	useEffect(() => {
		axios.get("/api/posts/get/" + id).then((response) => {
			let post = response.data;
			console.log(post);
			axios.get("/api/user/" + post.user).then((res) => {
				const { avatar, follows, username } = res.data;
				const temp = { avatar, follows, username };

				post.user = temp;
				setPost(post);
			});
		});
	}, []);

	return (
		<Card
			key={post.id}
			id={post.id}
			username={post.user.username}
			text={post.content}
			likes={post.likes}
			avatar={post.user.avatar}
			timestamp={post.timestamp}
		/>
	);
};
