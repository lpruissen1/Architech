import React, { useState } from 'react'
import { useParams } from "react-router-dom";

export function Research(props) {

	let { value } = useParams();

	const [tickerValue, setTickerValue] = useState(value)

	return (
		<h1> {value} </h1>
	)
}
