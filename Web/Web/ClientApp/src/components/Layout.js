import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import AuthClient from '../Clients/AuthClient';

export class Layout extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loggedIn: false
		}
	}

	updateLoggedIn() {
		const token = AuthClient.getCurrentUser()
		if (token) {
			this.setState({ loggedIn: true })
		}
	}
	static displayName = Layout.name;

	render () {
		return (
			<div>
				<NavMenu loggedIn={ this.state.loggedIn }/>
				<Container>
					{React.cloneElement(this.props.children, { updateLoggedIn: this.updateLoggedIn })}
				</Container>
			</div>
		);
	}
}
