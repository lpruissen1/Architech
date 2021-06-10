import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router';
import { Container } from 'reactstrap';
import AuthClient from '../Clients/AuthClient';
import { Education } from './Education/Education';
import { Home } from './Home/Home';
import { Login } from './Login/Login';
import { Registration } from './Login/Registration';
import { Portfolios } from './Portfolios/Portfolios';
import { Profile } from './Profile/Profile';
import { Research } from './Research/Research';
import { Screener } from './Screener/Screener';
import { NavMenu } from './NavMenu';

export function Layout(props) {

	const [loggedIn, setLoggedIn] = useState()
	const [userId, setUserId] = useState("")

	const updateLoggedIn = () => {
		const token = AuthClient.getCurrentUser()

		if (token) {
			setLoggedIn(true)
		}
		else {
			setLoggedIn(false)
		}
	}

	useEffect(() => {updateLoggedIn()}, [])

	return (
		<div>
			<NavMenu loggedIn={loggedIn} updateLoggedIn={updateLoggedIn} />
			<Container>
				<Route exact path='/' component={Home} />
				<AuthenticatedRoute exact path='/screener' loggedIn={loggedIn} component={() => <Screener userId={userId} />} />
				<AuthenticatedRoute exact path='/portfolios' loggedIn={loggedIn} component={Portfolios} />
				<AuthenticatedRoute exact path='/research' loggedIn={loggedIn} component={Research} />
				<AuthenticatedRoute exact path='/education' loggedIn={loggedIn} component={Education} />
				<AuthenticatedRoute exact path='/profile' loggedIn={loggedIn} component={Profile} />
				<Route exact path='/login' component={() => <Login updateLoggedIn={updateLoggedIn} setUserId={setUserId} />} />
				<Route exact path='/register' component={() => <Registration updateLoggedIn={updateLoggedIn} setUserId={setUserId} />} />
			</Container>
		</div>
	);
}

export default function AuthenticatedRoute({ component: C, loggedIn, ...rest }) {
	return (
		<Route
			{...rest}
			render={props =>
				loggedIn
					? <C {...props} />
					: <Redirect to={{ pathname: '/login'}}  />} // we should add a little message to be passed in that can be displayed on this page to info the user why they have been logged out.
		/>
	);
}
