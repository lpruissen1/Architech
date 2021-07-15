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
	paper: {
		backgroundColor: '#545454'
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
			<div style={{ marginTop: 0, marginBottom: 40, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
				<FormControl style={{ width: 400, marginTop: 0 }}>
					<InputLabel style={{ zIndex: 1, marginLeft: 10, color: '#d0d0d0', fontSize: 14 }} id="demo-simple-select-filled-label">Select A Metric</InputLabel>
					<Select
						onChange={superClickie}
						className={classes.select}
						inputProps={{
							classes: {
								icon: classes.icon,
								paper: classes.paper     
							},
						}}
						MenuProps={{
							anchorOrigin: {
								vertical: "bottom",
								horizontal: "left"
							},
							getContentAnchorEl: null,
							classes: {
								paper: classes.paper
							},
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
								style={{backgroundColor: '#545454', color: '#d0d0d0'}}
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

