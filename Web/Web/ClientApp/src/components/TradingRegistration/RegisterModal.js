﻿import React, { useState, useEffect } from 'react';
import RaisedCard from '../Generic/RaisedCard';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PersonalInfoWorkflow from './PersonalInfoWorkflow';
import DisclosuresWorkflow from './DisclosuresWorkflow';
import AgreementsWorkflow from './AgreementsWorkflow';
import UserClient from '../../Clients/UserClient';
import AccountsClient from '../../Clients/AccountsClient';
import './PremiumModal.css';
import { post } from 'jquery';

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

export default function RegisterModal(props) {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const [firstName, setFirstName] = useState()
	const [lastName, setLastName] = useState()
	const [address, setAddress] = useState()
	const [city, setCity] = useState()
	const [state, setState] = useState()
	const [postalCode, setPostalCode] = useState()
	const [email, setEmail] = useState()
	const [phoneNumber, setPhoneNumber] = useState()
	const [dateOfBirth, setDateOfBirth] = useState()
	const [taxResidency, setTaxResidency] = useState()

	const [fundingSource, setFundingSource] = useState();
	const [isControlledPerson, setIsControlledPerson] = useState(false)
	const [isAffiliatedExchangeOrFinra, setIsAffiliatedExchangeOrFinra] = useState(false)
	const [isPoliticallyExposed, setIsPoliticallyExposed] = useState(false)
	const [immediateFamilyExposed, setImmediateFamilyExposed] = useState(false)

	const loadInfo = async () => {
		const info = await UserClient.GetInfo()
		setFirstName(info.firstName)
		setLastName(info.lastName)
		setEmail(info.email)
	}

	useEffect(async () => await loadInfo(), [])

	const CreateTradingAccount = () => {
		const body = {
			userId: AuthClient.GetIdFromStoredJwt(),
			firstName: firstName,
			lastName: lastName,
			taxIdNumber: "111-27-0000",
			phoneNumber: phoneNumber,
			emailAddress: email,
			streetAddress: address,
			city: city,
			state: state,
			postalCode: postalCode,
			dateOfBirth: dateOfBirth,
			countryOfTaxResidency: taxResidency,
			fundingSource: "employment_income",
			isControlledPerson: isControlledPerson,
			isAffiliatedExchangeOrFinra: isAffiliatedExchangeOrFinra,
			isPoliticallyExposed: isPoliticallyExposed,
			immediateFamilyExposed: immediateFamilyExposed,
			photoIdFront: "string",
			photoIdBack: "string",
			ipAddress: "string",
			customerAgreementSignedAt: "string",
			marginAgreementSignedAt: "string",
			accountAgreementSignedAt: "string"
		}
	}

	//Personal Info, Tax Info, Disclosures, Agreements. Need to make fourth part of slider. Make entire modal bigger. 
	//Set "Finish" button to make request to AccountsClient and then display loading (or if finished the status)
	const getSteps = () => {
		return ['Personal Information', 'Disclosures', 'Agreements'];
	}

	const getStepContent = (stepIndex) => {
		switch (stepIndex) {
			case 0:
				return <PersonalInfoWorkflow
					firstName={firstName}
					lastName={lastName}
					email={email}
					address={address}
					city={city}
					state={state}
					postalCode={postalCode}
					phoneNumber={phoneNumber}
					dateOfBirth={dateOfBirth}
					taxResidency={taxResidency}
					setFirstName={setFirstName}
					setLastName={setLastName}
					setEmail={setEmail}
					setAddress={setAddress}
					setCity={setCity}
					setState={setState}
					setPostalCode={setPostalCode}
					setPhoneNumber={setPhoneNumber}
					setDateOfBirth={setDateOfBirth}
					setTaxResidency={setTaxResidency}
				/>
			case 1:
				return <DisclosuresWorkflow
					isControlledPerson={isControlledPerson}
					isPoliticallyExposed={isPoliticallyExposed}
					isAffiliatedExchangeOrFinra={isAffiliatedExchangeOrFinra}
					immediateFamilyExposed={immediateFamilyExposed}
					fundingSource={fundingSource}
					setFundingSource={setFundingSource}
					setIsPoliticallyExposed={setIsPoliticallyExposed}
					setIsControlledPerson={setIsControlledPerson}
					setIsAffiliatedExchangeOrFinra={setIsAffiliatedExchangeOrFinra}
					setImmediateFamilyExposed={setImmediateFamilyExposed}
				/>;
			case 2:
				return <AgreementsWorkflow />
			default:
				return 'Unknown stepIndex';
		}
	}

	const steps = getSteps();

	const handleNext = () => {
		const tempStep = activeStep + 1
		setActiveStep(tempStep);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<RaisedCard style={{ boxShadow: 'none', width: '75%', height: '80%', margin: 'auto' }}>
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
