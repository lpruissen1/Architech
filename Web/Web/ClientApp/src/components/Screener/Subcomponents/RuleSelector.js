import React, { useState } from "react";
import './BasicRules.css';

export default function RuleSelector() {
	const [displayList, setDisplayList] = useState(false);
	const shit = displayList ? "Hi" : <button className="newMetricButton">Add New Metric </button>;

    return (
        shit
    );
}
