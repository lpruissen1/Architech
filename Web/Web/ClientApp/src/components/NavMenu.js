import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import './NavMenu.css';
import AuthClient from '../Clients/AuthClient';
import Logo from './ArchitechLogo.svg';
import Typography from '@material-ui/core/Typography';

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
			<header className='stick-nav'>
				<Navbar className="navbar-expand-sm navbar-toggleable-sm mb-3 pb-0" dark>
					<Container style={{ backgroundColor: '#121212', paddingRight: 30}}>
						<NavbarBrand tag={Link} to="/">
							<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
								<img style={{
									width: 32, height: 32, marginRight: 10, backgroundColor: '64ffda' }} src={Logo} alt="Architech Logo" />
								<Typography variant="h6" style={{ fontWeight: 600, color: '#fff', fontSize: 28 }}>architech</Typography>
							</div>
						</NavbarBrand>
						<NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
						<Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
							<ul className="navbar-nav flex-grow">
								{this.props.loggedIn ? (
									<>
										<NavItem onClick={this.props.updateLoggedIn}>
											<NavLink tag={Link} className="text-light" to="/dashboard">Dashboard</NavLink>
										</NavItem>
										<NavItem onClick={this.props.updateLoggedIn}>
											<NavLink tag={Link} className="text-light" to="/portfolioBuilder">Portfolio Builder</NavLink>
										</NavItem>
										<NavItem onClick={this.props.updateLoggedIn}>
											<NavLink tag={Link} className="text-light" to="/portfolios">Portfolios</NavLink>
										</NavItem>
										<NavItem onClick={this.props.updateLoggedIn}>
											<NavLink tag={Link} className="text-light" to="/research">Research</NavLink>
										</NavItem>
										<NavItem onClick={this.props.updateLoggedIn}>
											<NavLink tag={Link} className="text-light" to="/education">Education</NavLink>
										</NavItem>
										<NavItem onClick={this.props.updateLoggedIn}>
											<NavLink tag={Link} className="text-light" to="/profile">Profile</NavLink>
										</NavItem>
										<NavItem onClick={this.props.updateLoggedIn}>
											<NavLink tag={Link} onClick={this.logout} className="text-light" to="/">Logout</NavLink>
										</NavItem>
									</>
								) : (
									<NavItem>
										<NavLink tag={Link} className="text-light" to="/login">Login</NavLink>
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
