import React, { useState } from "react";
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { NumberFormatter } from '../../../../../Formatter/Formatter'
import './Rules.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		color: theme.palette.primary,
		width: '50%'
	},
}));

const RuleSlider = withStyles({
	root: {
		height: 8,
		width: 240,
	},
	thumb: {
		height: 20,
		width: 20,
		backgroundColor: '#fff',
		border: '2px solid #fff',
		marginTop: -6,
		marginLeft: -10,
		'&:focus, &:hover, &$active': {
			boxShadow: 'inherit',
		},
	},
	active: {},
	valueLabel: {
		left: 'calc(-50%)',
		fontSize: 10,
		width: 40,
	},
	track: {
		height: 6,
		borderRadius: 20,
	},
	rail: {
		height: 6,
		borderRadius: 20,
	},
})(Slider);


export default function RangedRule(props) {
	const [value, setValue] = React.useState([props.rule.lower, props.rule.upper]);
	const [high, setHigh] = useState(props.rule.upper);
	const [low, setLow] = useState(props.rule.lower);
	const classes = useStyles();

	const fontColor = '#fff'

	const updateView = (event, newValue) => {
		setValue(newValue);
		let rule = props.rule
		rule.lower = value[0]
		rule.upper = value[1]
		setHigh(value[1])
		setLow(value[0])
	}

	const updateRuleRanges = (event, newValue) => {
		updateView(event, newValue)
	}

	const deleteRule = () => {
		const rule = props.rule
		props.deleteRangedRule(rule)
	}

	return (
		<div className="ranged-rule-container" style={{ borderTop: '1px solid #545454', borderBottom: '1px solid #545454' }}>
			<Grid container
				spacing={1}
				direction="row"
				alignItems="flex-end">
				<Grid style={{color: fontColor}} item xs={4} justifyContent="flex-start">
					<Typography style={{ marginBottom: 14, marginLeft: 30 }}>{props.option.displayName}</Typography>
				</Grid>
				<Grid item xs={4} justifyContent="flex-start">
					<div className={classes.root}>
						<RuleSlider
							valueLabelDisplay="auto"
							min={props.option.selectorMin}
							max={props.option.selectorMax}
							value={value}
							valueLabelFormat={value => <div>{NumberFormatter(value)}</div>}
							onChange={updateView}
							onChangeCommitted={updateRuleRanges}/>
					</div>
				</Grid>
				<Grid item xs={3} justify="center" align="center">
				</Grid>
				<Grid item xs={1} justifyContent='flex-end'>
					<IconButton style={{ color: fontColor }} onClick={deleteRule} aria-label="delete">
						<DeleteIcon />
					</IconButton>
				</Grid>
			</Grid>
		</div>
	);
}
