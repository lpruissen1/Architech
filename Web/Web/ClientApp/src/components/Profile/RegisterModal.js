import React, { useState } from 'react';
import RaisedCard from '../Generic/RaisedCard';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		height: '100%'
	},
	backButton: {
		marginRight: theme.spacing(1),
		color: '#c0c0c0',
		textTransform: 'none',
	},
	step: {
		color: '#727272',
		"&$completed": {
			color: theme.palette.success.dark,
			backgroundColor: '#fff',
			borderRadius: '50%'
		},
		"&$active": {
			color: '#e0fff8'
		},
		"&$disabled": {
			color: "red"
		}
    },
	alternativeLabel: {
		color: '#727272',
	},
	active: {},
	completed: {},
	disabled: {},
	labelContainer: {
		paddingTop: -2,
	"&$alternativeLabel": {
		marginTop: 0,
	},
},
}));

function getSteps() {
	return ['Personal Information', 'Disclosures', 'Agreements'];
}

function getStepContent(stepIndex) {
	switch (stepIndex) {
		case 0:
			return 'Select campaign settings...';
		case 1:
			return 'What is an ad group anyways?';
		case 2:
			return 'This is the bit I really care about!';
		default:
			return 'Unknown stepIndex';
	}
}

export default function RegisterModal(props) {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<RaisedCard style={{ boxShadow: 'none', width: '60%', height: '70%', margin: 'auto' }}>
			<div className={classes.root} style={{ backgroundColor: 'none' }}>
				<Grid container style={{ height: '100%' }}>
					<Grid item xs={12} style={{ height: '25%' }}>
				<Stepper activeStep={activeStep}
					alternativeLabel
					style={{ backgroundColor: 'transparent'}}
				>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel
								classes={{
									alternativeLabel: classes.alternativeLabel,
									labelContainer: classes.labelContainer
								}}
								StepIconProps={{
									classes: {
										root: classes.step,
										completed: classes.completed,
										active: classes.active,
										disabled: classes.disabled
									}
								}}
							>
								{label}
							</StepLabel>
						</Step>
					))}
					</Stepper>
					</Grid>
					<Grid item xs={12} style={{ height: '55%' }}>
						{getStepContent(activeStep)}
					</Grid>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={6}>
								<Button
								style={{marginLeft: 20, outline: 'none', minWidth: 100}}
								disabled={activeStep === 0}
								onClick={handleBack}
								className={classes.backButton}
								>
									Back
								</Button>
							</Grid>
							<Grid item xs={6} style={{ display: 'flex', justifyContent:'flex-end' }}>
								<Button style={{marginBottom: 0, marginRight: 20, textTransform: 'none', outline: 'none', minWidth: 100 }} variant="contained" color="primary" onClick={handleNext}>
									{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
								</Button>
							</Grid>
						</Grid>
					</Grid>
			</Grid>
			</div>
		</RaisedCard>
	)
}
