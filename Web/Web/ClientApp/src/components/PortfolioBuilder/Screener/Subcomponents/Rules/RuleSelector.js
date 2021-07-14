import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './Rules.css';

const useStyles = makeStyles((theme) => ({
	root: {}
}));

export default function RuleSelector(props) {
	const [displayList, setDisplayList] = useState(true);
	const clickie = () => setDisplayList(!displayList)
	const classes = useStyles()

	const superClickie = (event) => {
		setDisplayList(!displayList)
		props.handleAddNewMetricClick(event)
	}

	const disableOption = (rule) => {
		if (rule.type === 'ranged') {
			const value = props.checkIfRangedRuleExists(rule.value)
			return value
		}

		return false
	}

		return (
			<div className="rule-container">
				<FormControl style={{ width: 400, marginTop: 0 }}>
					<InputLabel id="demo-simple-select-filled-label">Add New Metric</InputLabel>
					<Select
						onChange={superClickie}
					>
					{props.options && props.options.map((option) =>
						disableOption(option)
							? 
							<MenuItem
								disabled
								value={option.value}
								type={option.type}
								> {option.displayName} 
								</MenuItem>
							: <MenuItem
								value={{ type: option.type, value: option.value }}
								type={option.type}
								> {option.displayName} 
							</MenuItem>
					)}
					</Select>
				</FormControl>
			</div>
		)
}

