import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

export default function AgreementsWorkflow(props) {
	const [numPages, setNumPages] = useState(null);
	const textColor = '#d0d0d0'

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	function onCheck() {
		props.setTimestamp(Date.now())
	}

	return (
		<>
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
			<br/>
			<>
				I have read, understood, and agree to be bound by Alpaca Securities LLC and PARTNER account terms, and all other terms, disclosures and
				disclaimers applicable to me, as referenced in the Application Agreement and Customer Agreement.
			</>
			<br/>
			<>
				I understand I am signing this agreement electronically and that my electronic signature is the legal equivalent of my manual signature on this
				Agreement.
			</>
			<Checkbox
				style={{ color: textColor }}
				color='primary'
				onClick={onCheck}
				checked={props.isChecked}
				value={props.value}
				icon={
					<CheckBoxOutlineBlankIcon
						fontSize="small" />}
				checkedIcon={
					<CheckBoxIcon
						color='primary'
						fontSize="small" />}
			/>
		</>
	)
}
