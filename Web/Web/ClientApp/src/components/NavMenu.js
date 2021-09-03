import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import AuthClient from '../Clients/AuthClient';
import Logo from './ArchitechLogo.svg';
import LogoFont from './ArchitechLogoFont.svg';
import PrimaryActionButton from './Generic/PrimaryActionButton';
import PrimaryLinkButton from './Generic/PrimaryLinkButton';
import './NavMenu.css';

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
				<Navbar className="navbar-expand-sm navbar-toggleable-sm mb-3 pb-0 pl-0 pr-0" dark>
					<div style={{marginLeft: '5%', marginRight: '5%', display: 'flex', flexDirection: 'row', width: '100%'}}>
						<NavbarBrand tag={Link} to="/">
							<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
								<img style={{
									width: 32, height: 32, marginRight: 10, marginLeft: 0, marginBottom: 2
								}} src={Logo} alt="Architech Logo" />
								<img style={{
									 height: 32, marginLeft: 0
								}} src={LogoFont} alt="Architech Logo Font" />
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
										<PrimaryActionButton onClick={this.props.fundMeDaddy} text="fund me :)" className="text-light" />
										<PrimaryLinkButton to="/trade" text="Trade" className="text-light" />
									</>
								) : (
									<NavItem>
										<NavLink tag={Link} className="text-light" to="/login">Login</NavLink>
									</NavItem>
								)}
							</ul>
						</Collapse>
					</div>
				</Navbar>
			</header>
		);
	}
}
