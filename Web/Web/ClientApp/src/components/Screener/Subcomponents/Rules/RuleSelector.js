import React, { useState } from "react";
import './Rules.css';

export default function RuleSelector(props) {
	const [displayList, setDisplayList] = useState(false);
	const clickie = () => setDisplayList(!displayList)

	const superClickie = (event) => {
		setDisplayList(!displayList)
		props.handleAddNewMetricClick(event)
	}

	const disableButton = (rule) => {
		if (rule.type === 'ranged') {
			const value = props.checkIfRangedRuleExists(rule.value)
			return value
		}

		return false
	}

	const renderOptions = () => {
		return (
			<div className="flex">
				{props.options && props.options.map((option) =>
					disableButton(option)
						? <button key={option.value} className="buttonDisabled" type={option.type} value={option.value}> {option.displayName} </button>
						: <button key={option.value} className="button" type={option.type} value={option.value} onClick={superClickie}> {option.displayName} </button>)}
			</div>
		)
	}

	const display = displayList ? renderOptions() : <button className="newMetricButton" onClick={clickie}> + Add New Metric </button>;

    return (
		<>{display}</>
    );
}
