import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/umd/entry.webpack';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function AgreementsWorkflow(props) {
	const [numPages, setNumPages] = useState(null);
	const textColor = '#d0d0d0'

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	function onCheck(event) {
		props.setAgreed(!props.agreed)
		props.setTimestamp(Date.now())
	}

	return (
		<Grid container spacing={1} style={{ paddingLeft: '3%', paddingRight: '3%', paddingBottom: 60 }}>
			<Grid align="left" justify="left" item xs={12} style={{ color: '#f0f0f0', marginTop: 30, marginBottom: 10 }}><Typography variant='h5'>Account Agreement</Typography></Grid>
			<Grid align="left" justify="left" item xs={12} style={{ color: '#e0e0e0', marginBottom: 24 }}><Typography variant='body1'>Please read and acknowledge the following agreement</Typography></Grid>
			<Grid item xs={12}>
				<div style={{padding: 20, backgroundColor: '#484848', width: '75%', marginTop: 20, borderRadius: 4}}>
					<div style={{height: 600, overflow: "scroll"}}>
						<Document
							file="https://files.alpaca.markets/disclosures/library/AcctAppMarginAndCustAgmt.pdf"
							onLoadSuccess={onDocumentLoadSuccess}
						>
							{
								Array.from(
									new Array(numPages),
									(el, index) => (
										<Page
											key={`page_${index + 1}`}
											pageNumber={index + 1}
										/>
									),
								)
							}
						</Document>
					</div>
				</div>
			</Grid>
			<Grid item xs={12} style={{ marginTop: 36, marginBottom: 30 }} align='left' justify='left'>
				<Typography variant='body1' style={{ color: '#e0e0e0' }}>
					I have read, understood, and agree to be bound by Alpaca Securities LLC and PARTNER account terms, and all other terms, disclosures and
					disclaimers applicable to me, as referenced in the Application Agreement and Customer Agreement.
				</Typography>
			</Grid>
			<Grid item xs={1} align='left' justify='left'>
				<Checkbox
					style={{ color: textColor }}
					color='primary'
					onClick={onCheck}
					checked={props.agreed}
					value={props.value}
					icon={
						<CheckBoxOutlineBlankIcon
							fontSize="small" />}
					checkedIcon={
						<CheckBoxIcon
							color='primary'
							fontSize="small" />}
				/>
			</Grid>
			<Grid item xs={11}>
				<Typography variant='body1' align='left' justify='left' style={{ color: '#e0e0e0', fontStyle: "italic" }}>
					I understand I am signing this agreement electronically and that my electronic signature is the legal equivalent of my manual signature on this
					Agreement.
				</Typography>
			</Grid>
		</Grid>
	)
}
