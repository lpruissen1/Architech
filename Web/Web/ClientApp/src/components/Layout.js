import React, { Component } from 'react';
import { Route } from 'react-router';
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
			loggedIn: false
		}
	}

	updateLoggedIn = () => {
		const token = AuthClient.getCurrentUser()
		debugger
		if (token) {
			this.setState({ loggedIn: true })
		}
	}

	componentDidMount() {
		this.updateLoggedIn()
	}

	render () {
		return (
			<div>
				<NavMenu loggedIn={ this.state.loggedIn }/>
				<Container>
					<Route exact path='/' component={Home} />
					<Route exact path='/screener' component={Screener} />
					<Route exact path='/portfolios' component={Portfolios} />
					<Route exact path='/login' component={() => <Login updateLoggedIn={this.updateLoggedIn} />}/>
					<Route exact path='/register' component={() => <Registration updateLoggedIn={this.updateLoggedIn} />}/>
					<Route exact path='/research' component={Research} />
					<Route exact path='/education' component={Education} />
					<Route exact path='/profile' component={Profile} />
				</Container>
			</div>
		);
	}
}
