import React, { useState } from 'react'
import './SaveButton.css'

export default function SaveButton(props) {
	const [checked, setChecked] = useState(true)

	const handleSaveClick = (event) => {
		props.handleSave()
		setChecked(!checked)
	}

	return (
		<>
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" crossorigin="anonymous" />
			{checked 
				? <button onClick = { handleSaveClick } className="saveButton">Save Index</button>
				: <button className="saveButtonClicked">Saved <i class="fas fa-check"></i></button>}
		</>)
}
