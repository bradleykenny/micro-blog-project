import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./";

type CardListProps = {};

export const CardList = (props: CardListProps) => {
	const [cards, setCards] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:5000/posts/10").then((response) => {
			setCards(response.data);
			console.log(cards);
		});
	});

	const cardsS = cards.map((c: any) => (
		<Card username={c.user} text={c.content} likes={0} />
	));

	return cardsS;
};
