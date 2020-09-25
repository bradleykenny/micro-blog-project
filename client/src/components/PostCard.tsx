import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import {
	Card as BCard,
	Container,
	Row,
	Col,
	Form,
	Button,
} from "react-bootstrap";

import { JWT } from "../types/JWT";

type PostCardProps = {
	user: JWT;
};

export const PostCard = (props: PostCardProps) => {
	const [content, setContent] = useState("");
	const [showForm, setShowForm] = useState(false);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		axios
			.post("http://localhost:5000/posts/create", {
				user: props.user.id,
				content: content,
				likes: [],
			})
			.then((res) => {
				alert("Content posted!");
				console.log(res);
				setContent("");
			});
	};

	const handleChange = (e: any) => {
		e.preventDefault();
		const { name, value } = e.target;

		switch (name) {
			case "content":
				setContent(value);
				break;
			default:
				break;
		}
	};

	const handleShowHide = () => {
		console.log(showForm);
		setShowForm(!showForm);
	};

	if (props.user) {
		if (showForm) {
			return (
				<Container>
					<Row className="d-flex justify-content-center">
						<Col className="align-items-center">
							<BCard>
								<BCard.Body>
									<p
										style={{ float: "right" }}
										onClick={handleShowHide}
									>
										Hide Form
									</p>
									{/* <BCard.Title className="text-center">
										<h1>Create post</h1>
									</BCard.Title> */}
									<Form onSubmit={handleSubmit}>
										<Form.Group controlId="formUsername">
											<Form.Label>
												What do you want to say?
											</Form.Label>
											<Form.Control
												name="content"
												type="text"
												placeholder="Content"
												onChange={handleChange}
											/>
										</Form.Group>
										<Button
											variant="primary"
											type="submit"
											className="btn-block"
										>
											Submit
										</Button>
									</Form>
								</BCard.Body>
							</BCard>
						</Col>
					</Row>
				</Container>
			);
		} else {
			return (
				<Container>
					<BCard>
						<BCard.Body>
							<Button
								variant="primary"
								type="submit"
								className="btn-block"
								onClick={handleShowHide}
								style={{ marginTop: "25px" }}
							>
								Create a post
							</Button>
						</BCard.Body>
					</BCard>
				</Container>
			);
		}
	} else {
		return <p>Please log in to create a post</p>;
	}
};
