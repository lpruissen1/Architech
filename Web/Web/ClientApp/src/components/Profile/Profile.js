import Grid from '@material-ui/core/Grid';
import React from 'react';
import TransferRequests from './TransferRequests';
import TabPanel from '../Generic/TabPanel';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonalInformation from './PersonalInformation';
import AccountInformation from './AccountInformation';
import PrimaryLinkButton from '../Generic/PrimaryLinkButton';


export const useStyles = makeStyles((theme) => ({
	indicator: {
		backgroundColor: theme.palette.info.main
	},
	root: {
		textTransform: 'none',
		fontSize: 15
	},
	appBar: {
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		height: 48,
		backgroundColor: '#484848',
		color: '#fff'
	}
}));

export function Profile() {
	const [step, setStep] = React.useState(0);


	const handleChange = (event, newValue) => {
		setStep(newValue);
	};

	const classes = useStyles();

	return (
		<>
			<Grid container style={{
				width: '100%',
				height: '100%',
				maxWidth: 1200,
				display: 'flex',
				borderRadius: 4,
				backgroundColor: '#404040'
			}}>
				<AppBar className={classes.appBar} elevation={1} style={{ position: 'sticky', top: 0 }}>
					<Grid container spacing={0}>
						<Grid item xs={10}>
							<Tabs
								classes={{
									indicator: classes.indicator
								}}
								style={{ outline: 'none' }}
								value={step}
								onChange={handleChange}
								aria-label="simple tabs example">
								<Tab className={classes.root} style={{ outline: 'none' }} label="Personal" />
								<Tab className={classes.root} style={{ outline: 'none' }} label="Account" />
								<Tab className={classes.root} style={{ outline: 'none' }} label="Transfers" />
							</Tabs>
						</Grid>
						<Grid item xs={2} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
							<PrimaryLinkButton text="Upgrade Membership" to="/tradingRegistration" style={{ fontSize: 12, margin: 0, marginRight: 8 }} />
						</Grid>
					</Grid>
				</AppBar>
				<TabPanel value={step} index={0}>
					<div style={{ padding: 40, paddingLeft: 20, paddingRight: 10 }}>
						<PersonalInformation />
					</div>
				</TabPanel>
				<TabPanel value={step} index={1}>
					<div style={{ padding: 40, paddingLeft: 20, paddingRight: 10 }}>
						<AccountInformation />
					</div>
				</TabPanel>
				<TabPanel value={step} index={2}>
					<div style={{ padding: 40, paddingLeft: 20, paddingRight: 10 }}>
						<TransferRequests />
					</div>
				</TabPanel>
			</Grid>
		</>
	)
}

