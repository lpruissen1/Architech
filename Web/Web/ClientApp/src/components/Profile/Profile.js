import React, { useEffect, useState } from 'react';
import RaisedCard from '../Generic/RaisedCard';
import UserClient from '../../Clients/UserClient';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PrimaryActionButton from '../Generic/PrimaryActionButton';
import './PremiumModal.css';
import RegisterModal from './RegisterModal';

export function Profile() {
	const [userInfo, setUserInfo] = useState()
	const [modal, setModal] = useState(false)

	useEffect(async () => setUserInfo(await UserClient.GetInfo()), [])

	return (
		<div style={{ width: '100%', height: '100%' }}>
			{ modal &&
				<div className='premium-modal'>
				<RegisterModal userInfo={userInfo}/>
				</div >
			}
		<Grid container spacing={1} style={{ color: '#fff', position: 'relative', paddingLeft: 50, paddingRight: 50, paddingTop: 20 }}>
			<Grid item xs={12} style={{ marginBottom: 30 }}>
				<Grid container justifyContent='center'>
					<Typography variant='h3'>Your Profile</Typography>
				</Grid>
			</Grid>
			<Grid item xs={12} align="flex-start">
				<Grid container>
					<Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
						<Typography variant="h6" style={{ marginBottom: 10 }}>
							{userInfo ? 'Personal Information' : <Skeleton />}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Grid container justifyContent='flex-end'>
							<PrimaryActionButton text="Start Trading" style={{ fontSize: 12 }} onClick={() => setModal(true)} />
						</Grid>
					</Grid>
				</Grid>
				<div style={{ height: 2, backgroundColor: '#d0d0d0' }}></div>
			</Grid>

			<Grid item xs={12} style={{ paddingTop: 10, paddingLeft: 20 }}>
				<Typography variant="body1">
					{userInfo ? 'Name:   ' + userInfo.firstName + ' ' + userInfo.lastName : <Skeleton />}
				</Typography>
			</Grid>
			<Grid item xs={12} style={{ paddingTop: 10, paddingLeft: 20, paddingBottom: 30 }}>
				<Typography variant="body1">
					{userInfo ? 'Email:   ' + userInfo.email : <Skeleton />}
				</Typography>
			</Grid>
			<Grid item xs={12} align="flex-start">
				<Typography variant="h6">
					{userInfo ? 'Account Information' : <Skeleton />}
				</Typography>
				<div style={{ height: 2, backgroundColor: '#d0d0d0' }}></div>
			</Grid>
			<Grid item xs={12} style={{ paddingTop: 10, paddingLeft: 20 }}>
				<Typography variant="body1">
					{userInfo ? 'Username:   ' + userInfo.username : <Skeleton />}
				</Typography>
			</Grid>
		</Grid>
		</div>
	)
}
