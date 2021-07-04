import React from "react";
import './EmptyTickerTable.css';

export default function EmptyTickerTable() {
	return (
		<div className="emptyTickerTable">
			<div className="text-container">
				<h2> No tickers match these criteria </h2>
				<p> Try modifying your criteria to increase the number of available tickers </p>
			</div>
		</div>
		)
}
