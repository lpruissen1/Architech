﻿import React, { useState } from "react";
import './BasicRules.css';

export default function RuleSelector(props) {
	const [displayList, setDisplayList] = useState(false);
	const clickie = () => setDisplayList(!displayList)

	const renderOptions = () => {
		return (
			<>
				{props.options && props.options.map((option) =>
					<button key={ option.value} className="newMetricButton" type={option.type} value={option.value} onClick={props.handleAddNewMetricClick}> {option.displayName} </button>
				)}
			</>
		)
	}

	const display = displayList ? renderOptions() : <button className="newMetricButton" onClick={clickie}>Add New Metric </button>;

    return (
		<>{display}</>
    );
}
