import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import './NavMenu.css';

export default function Alerts(props) {

	const renderAlerts = () => {
		return ( props.alerts && props.alerts.map((alert) => {
			return <Alert severity="error" style={{ width: '20%' }} action={
				<IconButton
					aria-label="close"
					color="inherit"
					size="small"
					onClick={() => {
						props.removeAlert(alert.id)
					}}
				>
					<CloseIcon fontSize="inherit" />
				</IconButton>
			}>
						<AlertTitle>{alert.title}</AlertTitle>
						{alert.message}
					</Alert>
		}))
	}

		
	return (
		<Stack style={{ position: 'fixed', bottom: 0, zIndex: 12001, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
			<Alert severity="error" style={{ width: '20%' }}>
				<AlertTitle>Error</AlertTitle>
				This is an error alert — <strong>check it out!</strong>
			</Alert>
			{renderAlerts()}
		</Stack>
	);
}
