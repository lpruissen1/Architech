import React, { useState } from "react";
import './BasicRules.css';

export default function RuleSelector(props) {
	const [displayList, setDisplayList] = useState(false);
	const clickie = () => setDisplayList(!displayList)

	const renderOptions = () => {
		return (
			<>
				{props.options && props.options.map((option) =>
					<button className="newMetricButton" onClick={() => option.count++}> {option.displayName} </button>
				)}
			</>
		)
	}

	const display = displayList ? renderOptions() : <button className="newMetricButton" onClick={clickie}>Add New Metric </button>;

    return (
		<>{display}</>
    );
}
