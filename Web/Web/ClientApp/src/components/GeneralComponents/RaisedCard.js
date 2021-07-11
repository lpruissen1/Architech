import Paper from '@material-ui/core/Paper';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#363636',
		boxShadow: '0px 1px 10px #000000',
		borderRadius: 8
	}
}));

export default function RaisedCard(props) {

	const classes = useStyles()

	return (
		<Paper
			className={classes.root}
			style={props.style && props.style}
		>
			{props.children}
		</Paper>
	)
}
