import React from "react";
import BCard from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { CardList, PostCard } from "./";
import { JWT } from "../types/JWT";

type HomeProps = {
	user: JWT;
};

export const Home = (props: HomeProps) => {
	return (
		<div>
			<Container style={{ paddingTop: "100px" }}>
				<Row>
					<Col xs={4}>
						{props.user && (
							<BCard>
								<a href={"/profile/" + props.user.username}>
									<img src={props.user.avatar} alt="Avatar" />
								</a>
								<div className="card_text">
									<a href={"/profile/" + props.user.username}>
										<h2>@{props.user.username}</h2>
									</a>
									<p>
										<i>Some information here coming soon</i>
									</p>
									<p>
										Followers: {props.user.follows.length}
									</p>
									<p>
										Following: {props.user.follows.length}
									</p>
								</div>
							</BCard>
						)}
					</Col>
					<Col xs={6}>
						{props.user && <PostCard user={props.user} />}
						<CardList />
					</Col>
					<Col />
				</Row>
			</Container>
		</div>
	);
};
