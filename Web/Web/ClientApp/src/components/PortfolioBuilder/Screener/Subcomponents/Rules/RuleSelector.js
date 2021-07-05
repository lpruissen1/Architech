import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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

	const disableButton = (rule) => {
		if (rule.type === 'ranged') {
			const value = props.checkIfRangedRuleExists(rule.value)
			return value
		}

		return false
	}

	const renderOptions = () => {
		return (
			<div className = "rule-container">
				<Grid container spacing={1}>
					{props.options && props.options.map((option) =>
						disableButton(option)
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

	const display = displayList ? renderOptions() : <button className="newMetricButton" onClick={clickie}> + Add New Metric </button>;

    return (
		<>{display}</>
    );
}
