import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import AuthClient from '../Clients/AuthClient';
import { Dashboard } from './Dashboard/Dashboard';
import { Education } from './Education/Education';
import { Home } from './Home/Home';
import { Login } from './Login/Login';
import { Registration } from './Login/Registration';
import { PortfolioBuilder } from './PortfolioBuilder/PortfolioBuilder';
import { Portfolios } from './Portfolios/Portfolios';
import { Profile } from './Profile/Profile';
import { Research } from './Research/Research';
import TradingRegistration from './TradingRegistration/TradingRegistration';
import FundingModal from './Funding/FundingModal';
import TradeOverview from "./Trading/TradeOverview";
import './custom.css';
import LeftNav from './LeftNav';
import PrimarySearchAppBar from './PrimarySearchAppBar';
import AppBar from './AppBar';
import Alerts from './Alerts';
import Grid from '@material-ui/core/Grid';

export function App(props) {

	const [loggedIn, setLoggedIn] = useState()
	const [userId, setUserId] = useState("")
	const [shouldIFund, setShouldIFund] = useState(false)
	const [alerts, setAlerts] = useState([])

	const addAlert = (alert) => {
		setAlerts([...alerts, alert])
	}

	const removeAlert = (id) => {
		var temp = alerts.filter(alert => alert.id !== id)
		setAlerts(temp)
	}

	const fundMeDaddy = () => {
		setShouldIFund(!shouldIFund)
	}

	const updateLoggedIn = () => {
		const userId = AuthClient.GetIdFromStoredJwt()

		if (userId) {
			setLoggedIn(true)
			setUserId(userId)
		}
		else {
			setLoggedIn(false)
		}
	}

	useEffect(() => { updateLoggedIn() }, [])


	return (
		<>
			<div style={{justifyContent: 'center', height:'100%'}}>
				{shouldIFund &&
					<FundingModal fundMeDaddy={fundMeDaddy} addAlert={addAlert} />
				}
				<Grid container spacing={1}>
					<Grid item xs={12}>
						{loggedIn ? <PrimarySearchAppBar updateLoggedIn={updateLoggedIn} loggedIn={loggedIn} fundMeDaddy={fundMeDaddy} /> : <AppBar/>}
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item style={{ width: 200 }}>
								{loggedIn && <LeftNav />}
							</Grid>
							<Grid item xs style={{ padding: 30, paddingTop: 94 }}>
								<Route exact path='/' component={Home} />
								<AuthenticatedRoute exact path='/dashboard' component={() => <Dashboard />} />
								<AuthenticatedRoute exact path='/portfolioBuilder/:indexID?' component={PortfolioBuilder} />
								<AuthenticatedRoute exact path='/portfolios' component={() => <Portfolios userID={userId} />} />
								<AuthenticatedRoute exact path='/research' component={Research} />
								<AuthenticatedRoute exact path='/education' component={Education} />
								<AuthenticatedRoute exact path='/profile' component={Profile} />
								<AuthenticatedRoute exact path='/trade' component={TradeOverview} />
								<AuthenticatedRoute exact path='/tradingRegistration' component={TradingRegistration} />
								<Route exact path='/login' component={() => <Login updateLoggedIn={updateLoggedIn} setUserId={setUserId} />} />
								<Route exact path='/register' component={() => <Registration updateLoggedIn={updateLoggedIn} setUserId={setUserId} />} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Alerts alerts={alerts} removeAlert={removeAlert}/>
			</div>
		</>
	);
}

export default function AuthenticatedRoute({ component: C, ...rest }) {
	const userId = AuthClient.GetIdFromStoredJwt()
	return (
		<Route
			{...rest}
			render={props =>
				userId
					? <C {...props} />
					: <Redirect to={{ pathname: '/login'}}  />} // we should add a little message to be passed in that can be displayed on this page to info the user why they have been logged out.
		/>
	);
}
