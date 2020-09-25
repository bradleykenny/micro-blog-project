import React, { useEffect, useState } from "react";
import BCard from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { NavBar, CardList, PostCard } from "./";
import { JWT } from "../types/JWT";

type HomeProps = {
	user: JWT;
};

export const Home = (props: HomeProps) => {
	return (
		<div>
			<NavBar username={props.user ? props.user.id : ""} />
			<Container style={{ paddingTop: "100px" }}>
				<Row>
					<Col xs={4}>
						{props.user && (
							<BCard>
								<a href={"/profile/" + props.user.id}>
									<img src={props.user.avatar} />
								</a>
								<div className="card_text">
									<h2>@{props.user.id}</h2>
									<p>
										Followers: {props.user.follows.length}
									</p>
								</div>
							</BCard>
						)}
					</Col>
					<Col xs={6}>
						{props.user && <PostCard user={props.user} />}
						<CardList />
					</Col>
					<Col></Col>
				</Row>
			</Container>
		</div>
	);
};
