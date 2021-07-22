import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';

export default function TickerTableRow(props) {
	const [open, setOpen] = useState(false);

	return (
		<React.Fragment>
			<TableRow>
				<TableCell style={{ maxWidth: 10, justifyContent: 'flex-start', paddingLeft: 0, borderBottomColor: '#545454' }} align="left">
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} style={{ marginLeft: 2, outline: 'none', color: '#d0d0d0' }}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row" style={{ color: '#d0d0d0', borderBottomColor: '#545454'  }}>
					<Typography style={{ fontWeight: 600, marginLeft: 2 }}>{props.ticker}</Typography>
				</TableCell>
				<TableCell style={{ color: '#d0d0d0', borderBottomColor: '#545454'  }} align="left">
					{props.weight
						? <Typography>{Math.round((props.weight + Number.EPSILON) * 100) / 100}%</Typography>
						: <Typography>-</Typography>
					}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottomColor: '#545454'  }} colSpan={6}>
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
