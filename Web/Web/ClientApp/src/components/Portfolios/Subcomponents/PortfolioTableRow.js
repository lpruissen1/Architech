import React, { useState } from 'react';
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

	return (
		<React.Fragment>
			<TableRow>
				<TableCell>
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} style={{ outline: 'none' }}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					<Typography style={{ fontWeight: 600 }}>{props.name}</Typography>
				</TableCell>
				<TableCell align="left">
					{props.data
						? <Typography>{props.data}</Typography>
						: <Typography style={{ fontStyle: "oblique" }}>None</Typography>
					}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
