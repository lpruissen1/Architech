import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import AuthClient from '../Clients/AuthClient';
import './NavMenu.css';

export class NavMenu extends Component {
	static displayName = NavMenu.name;

	constructor(props) {
		super(props);

		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.state = {
			collapsed: true,
			loggedIn : ""
		};
	}

	toggleNavbar() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	componentDidMount() {
		const token = AuthClient.getCurrentUser();

		if (token) {
			this.setState({
				loggedIn: token
			});
		}
	}

	render() {
		debugger
		return (
			<header>
				<Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
					<Container>
						<NavbarBrand tag={Link} to="/">Architech</NavbarBrand>
						<NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
						<Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
							<ul className="navbar-nav flex-grow">
								{this.state.loggedIn ? (
									<>
										<NavItem>
											<NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
										</NavItem>
										<NavItem>
											<NavLink tag={Link} className="text-dark" to="/screener">Screener</NavLink>
										</NavItem>
										<NavItem>
											<NavLink tag={Link} className="text-dark" to="/portfolios">Portfolios</NavLink>
										</NavItem>
										<NavItem>
											<NavLink tag={Link} className="text-dark" to="/research">Research</NavLink>
										</NavItem>
										<NavItem>
											<NavLink tag={Link} className="text-dark" to="/education">Education</NavLink>
										</NavItem>
										<NavItem>
											<NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
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
