import React, { useState, useEffect } from 'react';
import UserClient from '../../Clients/UserClient';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import PrimaryLinkButton from '../Generic/PrimaryLinkButton';
import CreateAchRelationship from './CreateAchRelationship';
import TransferRequests from './TransferRequests';

export default function AccountInformation() {
	const [userInfo, setUserInfo] = useState()
	//const [achRelationship, setAchRelationship] = useState()

	useEffect(() => {
		const loadInfo = async () => {
			const info = await UserClient.GetInfo()
			setUserInfo(info)
		}

		loadInfo();
	}, []);

	return (
		<div style={{ width: '100%', minHeight: 480 }}>
			<CreateAchRelationship />
		</div>
	)
}
