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
		borderColor: '#c0c0c0'
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
	const [agreementTimestamp, setAgreementTimestamp] = useState()
	const [ssn, setSsn] = useState()
	const [ssnError, setSsnError] = useState(false)
	const [formValid, setFormValid] = useState(false)

	const [fundingSource, setFundingSource] = useState();
	const [isControlledPerson, setIsControlledPerson] = useState(false)
	const [isAffiliatedExchangeOrFinra, setIsAffiliatedExchangeOrFinra] = useState(false)
	const [isPoliticallyExposed, setIsPoliticallyExposed] = useState(false)
	const [immediateFamilyExposed, setImmediateFamilyExposed] = useState(false)

	const [agreed, setAgreed] = useState(false)
	const [idFrontFileName, setIdFrontFileName] = useState()
	const [idBackFileName, setIdBackFileName] = useState()

	const RetrieveClientIpAddress = async () => {
		const response = await fetch("https://geolocation-db.com/json/", {
			method: 'GET'
		});

		if (response.ok) {
			const json = await response.json();

			return json.IPv4
		}
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

	useEffect(() => { validateForm() }, [ssnError, agreed])

	const validateForm = () => {
		const errorList = [ssnError, agreed]

		if (errorList.indexOf(true) === -1) {
			setFormValid(true)
		}
		else {
			setFormValid(false)
		}
	}


	const createTradingAccount = async () => {
		const ipAddress = await RetrieveClientIpAddress()
		console.log(ipAddress)
		const body = {
			userId: AuthClient.GetIdFromStoredJwt(),
			firstName: firstName,
			lastName: lastName,
			taxIdNumber: ssn,
			phoneNumber: phoneNumber,
			emailAddress: email,
			streetAddress: address,
			city: city,
			state: state,
			postalCode: postalCode,
			dateOfBirth: dateOfBirth,
			countryOfTaxResidency: taxResidency,
			fundingSource: fundingSource,
			isControlledPerson: (isControlledPerson === 'true'),
			isAffiliatedExchangeOrFinra: (isAffiliatedExchangeOrFinra === 'true'),
			isPoliticallyExposed: (isPoliticallyExposed === 'true'),
			immediateFamilyExposed: (immediateFamilyExposed === 'true'),
			photoIdFront: idFront,
			photoIdBack: idBack,
			ipAddress: ipAddress,
			customerAndAccountAgreementSignedAt: agreementTimestamp,
		}

		AccountsClient.CreateTradingAccount(body)
	}

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
					idFront={idFront}
					idBack={idBack}
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
					setIdFrontFileName={setIdFrontFileName}
					setIdBackFileName={setIdBackFileName}
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
					setSsnError={setSsnError}
				/>;
			case 2:
				return <AgreementsWorkflow
					setTimestamp={setAgreementTimestamp}
					agreed={agreed}
					setAgreed={setAgreed}
				/>
			case 3:
				return <ReviewPage
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
					isControlledPerson={isControlledPerson}
					isPoliticallyExposed={isPoliticallyExposed}
					isAffiliatedExchangeOrFinra={isAffiliatedExchangeOrFinra}
					immediateFamilyExposed={immediateFamilyExposed}
					fundingSource={fundingSource}
					ssn={ssn}
					agreed={agreed}
					idFront={idFront}
					idBack={idBack}
					idFrontFileName={idFrontFileName}
					idBackFileName={idBackFileName}
				/>
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

	const getButtonText = (active, length) => {
		if (active < length - 2) {
			return 'Next'
		}

		else if (active === length - 2) {
			return 'Review'
		}

		return 'Finish'
	}

	return (
		<div style={{ width: '100%', height: '100%', backgroundColor: 'none' }}>
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
								variant='outlined'
								style={{marginLeft: 20, marginBottom: 24, outline: 'none', minWidth: 100}}
								disabled={activeStep === 0}
								onClick={handleBack}
								className={classes.backButton}
								>
									Back
								</Button>
							</Grid>
							<Grid item xs={6} style={{ display: 'flex', justifyContent:'flex-end' }}>
							<Button
								style={{ marginBottom: 0, marginRight: 20, textTransform: 'none', outline: 'none', minWidth: 100, marginBottom: 24 }}
								variant="contained"
								color="primary"
								onClick={activeStep === steps.length - 1 ? createTradingAccount : handleNext}
							>
									{getButtonText(activeStep, steps.length)}
							</Button>
							</Grid>
						</Grid>
					</Grid>
			</Grid>
		</div>
	)
}
