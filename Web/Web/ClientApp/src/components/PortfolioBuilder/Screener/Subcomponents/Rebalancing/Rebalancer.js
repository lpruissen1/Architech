import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import GetRebalancingOptions from "./RebalancingOptionsRepo";
import Typography from '@material-ui/core/Typography';
import PrimaryToggleButton from '../../../../Generic/PrimaryToggleButton';

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		width: '100%',
		borderRadius: 8
	},
	buttonInactive: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		width: '100%',
		color: '#d0d0d0',
		borderColor: '#d0d0d0',
		borderRadius: 8
	}
}));

export function Rebalancer(props) {
	const classes = useStyles();
	const [options, _] = useState(GetRebalancingOptions())

	return (
		<div>
			<Grid container spacing={1}>
				<Grid item xs={12} style={{ color: '#fffff', maxHeight: 100, marginTop: 20, marginLeft: 20 }}>
					<Typography style={{ marginTop: 8, color: '#fff' }} variant='h6'>Select Rebalancing Frequency</Typography>
				</Grid>
				<Grid item xs={12} style={{ paddingLeft: '10%', paddingRight: '10%', marginTop: 30 }}>
					<Grid container spacing={4}>
					{options.map(option => {
						return (
							<Grid item xs={3} key={option.value}>
								<Button
									onClick={(event) => props.setRebalancingFrequency(event.currentTarget.value)}
									value={option.value}
									style={{ outline: 'none' }}
									className={option.value === props.rebalancingFrequency ? classes.button : classes.buttonInactive}
									variant={option.value === props.rebalancingFrequency  ? 'contained' : 'outlined'}
									color={option.value === props.rebalancingFrequency  ? 'primary' : 'default'}
									disableElevation
									disableRipple
								>
									{option.displayName}
								</Button>
							</Grid>)})}
					</Grid>
				</Grid>
				<Grid item xs={12} style={{ color: '#fffff', maxHeight: 100, marginTop: 20, marginLeft: 20 }}>
					<Typography style={{ marginTop: 8, color: '#fff' }} variant='h6'>Automated Rebalancing</Typography>
				</Grid>
				<Grid item xs={12}>
					<PrimaryToggleButton text="Automatic Rebalancing" checked={props.automaticRebalancing} value={props.automaticRebalancing} onClick={(event) => props.setAutomaticRebalancing(!props.automaticRebalancing) }/>
				</Grid>
		</Grid>
		</div>
	)
}
