import { MenuItem } from '@material-ui/core';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles((theme) => ({
	selected: {
		backgroundColor: "#121212 !important",
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8,
	}
}))

export default function NavMenuItem(props) {

	const location = useLocation();

	const classes = useStyles();

	const selected = location.pathname === props.to

	return (
		<NavLink to={props.to} style={{ textDecoration: 'none', color: '#d0d0d0', marginLeft: 8 }}>
			<div style={{ marginTop: 4, marginBottom: 4 }}>
				<MenuItem
					selected={selected}
					classes={{ selected: classes.selected }}
				>
					<ListItemIcon style={{ color: '#d0d0d0', marginRight: 0}}>
						{props.icon}
					</ListItemIcon>
					{props.label}
				</MenuItem>
			</div>
		</NavLink>
	)
}

