import React, { Component } from 'react';
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

export class Layout extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loggedIn: false,
			userID: ''
		}
	}

	updateLoggedIn = () => {
		const token = AuthClient.getCurrentUser()
		if (token) {
			this.setState({ loggedIn: true })
		}
		else {
			this.setState({loggedIn : false})
		}
	}

	setUserID = (user) => {
		this.setState({userID : user})
	}

	componentDidMount() {
		this.updateLoggedIn()
	}

	render () {
		return (
			<div>
				<NavMenu loggedIn={this.state.loggedIn} updateLoggedIn={this.updateLoggedIn} />
				<Container>
					<Route exact path='/' component={Home} />
					<AuthenticatedRoute exact path='/screener/:indexID?' component={() => <Screener userID={this.state.userID} />} loggedIn={this.state.loggedIn} />
					<AuthenticatedRoute exact path='/portfolios' component={() => <Portfolios userID={this.state.userID} />} loggedIn={this.state.loggedIn} />
					<Route exact path='/login' component={() => <Login updateLoggedIn={this.updateLoggedIn} setUserID={this.setUserID} />} />
					<Route exact path='/register' component={() => <Registration updateLoggedIn={this.updateLoggedIn} setUserID={this.setUserID} />} />
					<AuthenticatedRoute exact path='/research' component={Research} loggedIn={this.state.loggedIn} />
					<AuthenticatedRoute exact path='/education' component={Education} loggedIn={this.state.loggedIn} />
					<AuthenticatedRoute exact path='/profile' component={Profile} loggedIn={this.state.loggedIn} userID={this.state.userID}/>
				</Container>
			</div>
		);
	}
}

export default function AuthenticatedRoute({ component: C, loggedIn, ...rest }) {
	return (
		<Route
			{...rest}
			render={props =>
				loggedIn
					? <C {...props} />
					: <Redirect to={{ pathname: '/login' }} />}
		/>
	);
}
