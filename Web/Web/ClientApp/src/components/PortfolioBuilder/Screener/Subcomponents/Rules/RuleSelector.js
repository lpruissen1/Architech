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
	button: {
		textTransform: 'none',
		fontSize: 12,
		fontWeight: 500,
		paddingLeft: 20,
		paddingRight: 20,
		borderColor: '#696969',
		color: '#696969',
		width: '100%',
		borderRadius: 10,
	},
	newMetricButton: {
		margin: '0 auto',
		display: "flex",
		width: '100%',
		color: 'rgb(70, 70, 70)',
		boxShadow: 'none',
		textTransform: 'none',
		fontSize: 14,
		backgroundColor: 'lightgrey',
		"&:hover": {
			backgroundColor: "#F1F1F1"
		}
	}
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

	const renderOptions = () => {
		return (
			<div className="rule-container">
				<FormControl variant="filled">
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
				<Grid container spacing={1}>
					{props.options && props.options.map((option) =>
						disableOption(option)
							? <Grid item xs={6}>
								<Button
									style={{ outline: 'none' }}
									key={option.value}
									variant="outlined"
									disabled
									className={classes.button}
									type={option.type}
									value={option.value}
								> {option.displayName} </Button>
							</Grid>
							: <Grid item xs={6}>
								<Button
									style={{ outline: 'none'}}
									key={option.value}
									variant="outlined"
									className={classes.button}
									type={option.type}
									value={option.value}
									onClick={superClickie}
								> {option.displayName} </Button>
							</Grid>
					)}
				</Grid>
			</div>
		)
	}

	const display = displayList ? renderOptions() :
			<div className="button-container">
				<Button className={classes.newMetricButton} onClick={clickie}>
					<Typography style={{ fontWeight: 700 }}>+ Add New Metric</Typography>
				</Button>
			</div>;

    return (
		<>{display}</>
    );
}
