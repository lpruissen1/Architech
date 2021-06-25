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
		<div>
			<NavMenu loggedIn={loggedIn} updateLoggedIn={updateLoggedIn} />
			<Container>
				<Route exact path='/' component={Home} />
				<AuthenticatedRoute exact path='/screener/:indexID?' loggedIn={loggedIn} component={() => <Screener userID={userId} />} />
				<AuthenticatedRoute exact path='/portfolios' component={() => <Portfolios userID={userId} />} />
				<AuthenticatedRoute exact path='/research' component={Research} />
				<AuthenticatedRoute exact path='/education' component={Education} />
				<AuthenticatedRoute exact path='/profile' component={Profile} />
				<Route exact path='/login' component={() => <Login updateLoggedIn={updateLoggedIn} setUserId={setUserId} />} />
				<Route exact path='/register' component={() => <Registration updateLoggedIn={updateLoggedIn} setUserId={setUserId} />} />
			</Container>
		</div>
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
