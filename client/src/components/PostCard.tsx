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
import { useHistory } from "react-router-dom";

import { JWT } from "../types/JWT";

type PostCardProps = {
	user: JWT;
};

export const PostCard = (props: PostCardProps) => {
	const [content, setContent] = useState("");
	const [showForm, setShowForm] = useState(false);
	const history = useHistory();

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (content.length > 0) {
			const config = {
				headers: { Authorization: "Bearer " + props.user.token },
			};
			axios
				.post(
					"/api/posts/create",
					{
						content: content,
					},
					config
				)
				.then((res) => {
					alert("Content posted!");
					history.push("/");
					setContent("");
				});
		}
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
									<Button
										variant="secondary"
										size="sm"
										style={{
											float: "right",
											marginTop: "-5px",
										}}
										onClick={handleShowHide}
									>
										Hide
									</Button>
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
												value={content}
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
					<BCard style={{ paddingTop: "10px" }}>
						<BCard.Body>
							<Button
								variant="primary"
								type="submit"
								className="btn-block"
								onClick={handleShowHide}
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
