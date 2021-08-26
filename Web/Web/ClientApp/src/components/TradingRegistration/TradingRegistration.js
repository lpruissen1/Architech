import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PersonalInfoWorkflow from './PersonalInfoWorkflow';
import DisclosuresWorkflow from './DisclosuresWorkflow';
import AgreementsWorkflow from './AgreementsWorkflow';
import ReviewPage from './ReviewPage';
import UserClient from '../../Clients/UserClient';
import AccountsClient from '../../Clients/AccountsClient';
import AuthClient from '../../Clients/AuthClient';
import './PremiumModal.css';

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

export default function TradingRegistration() {
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
	const [idFront, setIdFront] = useState()
	const [idBack, setIdBack] = useState()
	const [aggrementTimestamp, setAggrementTimestamp] = useState()
	const [ssn, setSsn] = useState()

	const [fundingSource, setFundingSource] = useState();
	const [isControlledPerson, setIsControlledPerson] = useState(false)
	const [isAffiliatedExchangeOrFinra, setIsAffiliatedExchangeOrFinra] = useState(false)
	const [isPoliticallyExposed, setIsPoliticallyExposed] = useState(false)
	const [immediateFamilyExposed, setImmediateFamilyExposed] = useState(false)

	const RetrieveClientIpAddress = async () => {
		const response = await fetch("https://geolocation-db.com/json/", {
			method: 'GET'
		});

		if (response.ok) {
			const json = await response.json();

			return json.IPv4
		}
	}

	const loadInfo = async () => {
		const info = await UserClient.GetInfo()
		setFirstName(info.firstName)
		setLastName(info.lastName)
		setEmail(info.email)
	}

	useEffect(() => {
		const loadInfo = async () => {
			const info = await UserClient.GetInfo()
			setFirstName(info.firstName)
			setLastName(info.lastName)
			setEmail(info.email)
		}

		loadInfo();
	}, []);

	const createTradingAccount = async () => {
		const ipAddress = await RetrieveClientIpAddress()
		console.log(ipAddress)
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
			photoIdFront: idFront,
			photoIdBack: idBack,
			ipAddress: ipAddress,
			customerAgreementSignedAt: "2020-09-11T18:13:44Z",
			accountAgreementSignedAt: "2020-09-11T18:13:44Z"
		}

		AccountsClient.CreateTradingAccount(body)
	}

	//Personal Info, Tax Info, Disclosures, Agreements. Need to make fourth part of slider. Make entire modal bigger. 
	//Set "Finish" button to make request to AccountsClient and then display loading (or if finished the status)
	const getSteps = () => {
		return ['Personal', 'Disclosures', 'Agreements', 'Review'];
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
					setIdFront={setIdFront}
					setIdBack={setIdBack}
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
					ssn={ssn}
					setSsn={setSsn}
				/>;
			case 2:
				return <AgreementsWorkflow setTimestamp={setAggrementTimestamp}/>
			case 3:
				return <ReviewPage />
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
		<div style={{ width: '100%', height: '100%', backgroundColor: 'none' }}>
			<Button style={{ marginBottom: 0, marginRight: 20, textTransform: 'none', outline: 'none', minWidth: 100, marginBottom: 24 }} variant="contained" color="primary" onClick={createTradingAccount}>
				Apply
			</Button>
			<Grid
				container
				style={{ height: '100%' }}>
				<Grid item xs={12} style={{ height: 160}}>
					<Stepper activeStep={activeStep}
						alternativeLabel
						style={{ backgroundColor: 'transparent', marginTop: 24}}
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
				<Grid align='center' justify = 'center' item xs={12} style={{ height: '40%' }}>
					<div style={{ width: '70%', height: '100%', background: '#363636', borderRadius: 4}}>
						{getStepContent(activeStep)}
					</div>
					</Grid>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={6}>
								<Button
								style={{marginLeft: 20, marginBottom: 24, outline: 'none', minWidth: 100}}
								disabled={activeStep === 0}
								onClick={handleBack}
								className={classes.backButton}
								>
									Back
								</Button>
							</Grid>
							<Grid item xs={6} style={{ display: 'flex', justifyContent:'flex-end' }}>
							<Button style={{ marginBottom: 0, marginRight: 20, textTransform: 'none', outline: 'none', minWidth: 100, marginBottom: 24 }} variant="contained" color="primary" onClick={handleNext}>
									{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
							</Grid>
						</Grid>
					</Grid>
			</Grid>
		</div>
	)
}
