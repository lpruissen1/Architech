import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './Rules.css';

const useStyles = makeStyles((theme) => ({
	select: {
		backgroundColor: '#545454',
		borderRadius: 4,
		'&:before': {
			borderColor: '#c0c0c0',
		},
		'&:after': {
			borderColor: '#c0c0c0',
		}
	},
	icon: {
		fill: '#c0c0c0',
	},
	input: {
		zIndex: 1
	}
}));

export default function RuleSelector(props) {
	const [displayList, setDisplayList] = useState(true);
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
					<InputLabel style={{ zIndex: 1, marginLeft: 10, color: '#d0d0d0', fontSize: 14 }} id="demo-simple-select-filled-label">Select A Metric</InputLabel>
					<Select
						onChange={superClickie}
						className={classes.select}
						inputProps={{
							classes: {
								icon: classes.icon,
								input: classes.input
							},
						}}
						MenuProps={{
							anchorOrigin: {
								vertical: "bottom",
								horizontal: "left"
							},
							getContentAnchorEl: null,
						}}
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

