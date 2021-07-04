import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import './NavMenu.css';
import AuthClient from '../Clients/AuthClient';

export class NavMenu extends Component {
	constructor(props) {
		super(props);

		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.logout = this.logout.bind(this);
		this.state = {
			collapsed: true,
		};
	}

	toggleNavbar() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	logout() {
		AuthClient.Logout()
		this.props.updateLoggedIn()
	}

	render() {
		return (
			<header>
				<Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
					<Container>
						<NavbarBrand tag={Link} to="/">Architech</NavbarBrand>
						<NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
						<Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
							<ul className="navbar-nav flex-grow">
								{this.props.loggedIn ? (
									<>
										<NavItem onClick={this.props.updateLoggedIn}>
											<NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
										</NavItem>
										<NavItem onClick={this.props.updateLoggedIn}>
											<NavLink tag={Link} className="text-dark" to="/screener">Screener</NavLink>
										</NavItem>
										<NavItem onClick={this.props.updateLoggedIn}>
											<NavLink tag={Link} className="text-dark" to="/portfolios">Portfolios</NavLink>
										</NavItem>
										<NavItem onClick={this.props.updateLoggedIn}>
											<NavLink tag={Link} className="text-dark" to="/research">Research</NavLink>
										</NavItem>
										<NavItem onClick={this.props.updateLoggedIn}>
											<NavLink tag={Link} className="text-dark" to="/education">Education</NavLink>
										</NavItem>
										<NavItem onClick={this.props.updateLoggedIn}>
											<NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
										</NavItem>
										<NavItem onClick={this.props.updateLoggedIn}>
											<NavLink tag={Link} onClick={this.logout} className="text-dark" to="/">Logout</NavLink>
										</NavItem>
									</>
								) : (
									<NavItem>
										<NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
									</NavItem>
								)}
							</ul>
						</Collapse>
					</Container>
				</Navbar>
			</header>
		);
	}
}
