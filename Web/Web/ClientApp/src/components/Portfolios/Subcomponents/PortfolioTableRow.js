﻿import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';

export default function PortfolioTableRow(props) {
	const [open, setOpen] = useState(false);
	const textColor = '#d0d0d0'
	const borderColor = '#545454'
	const iconColor = '#c0c0c0'


	return (
		<React.Fragment>
			<TableRow style={{ maxWidth: '100%'}}>
				<TableCell style={{ color: textColor, borderTop: '1px solid #606060', borderBottom: 'none', width: 20 }}>
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} style={{ outline: 'none', color: iconColor }}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row" style={{ color: textColor, borderTop: '1px solid #606060', borderBottom: 'none'}}>
					<Typography style={{ fontWeight: 600 }}>{props.name}</Typography>
				</TableCell>
				<TableCell
					align="left"
					style={{
						color: textColor,
						borderTop: '1px solid #606060',
						borderBottom: 'none',
					}}>
					{props.data
						? <Typography
							style={{
								display: 'inline-block',
								verticalAlign: 'middle',
								maxWidth: '80%',
								margin: 0,
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis'
						}}
						>{props.data}</Typography>
						: <Typography style={{ fontStyle: "oblique" }}>None</Typography>
					}
				</TableCell>
				<TableCell style={{borderTop: '1px solid #606060', borderBottom: 'none'}}></TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0, borderTop: '1px solid #606060', borderBottom: 'none', color: textColor, backgroundColor: '#545454'}} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box margin={1}>
							{props.interiorTable}
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	)
}
