import Button from "@material-ui/core/Button";
import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';

export default function ImageInput(props) {

	const [image, setImage] = useState()

	const convert = (e) => {
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);

		reader.onload = () => {
			setImage(reader.result)
			props.setImage(reader.result)
		};
		reader.onerror = error => {
			console.log("Error: ", error);
		};
	}

	return (
		<Grid container spacing={4}>
			<Grid item xs={6}> 
			<input
				accept="image/*"
				style={{
					display: "none"
				}}
					id={props.id}
				type="file"
				onChange={convert}
			/>
				<label htmlFor={props.id}>
				<Button
					style={{textTransform: 'none'}}
					variant="contained"
					color="primary"
					component="span"
					disableElevation
				>
					{props.label}
				</Button>
				</label>
			</Grid>
			<Grid item xs={6}>
				<img src={image} style={{ maxHeight: 160, maxWidth: 160 }} />
			</Grid>
		</Grid>
	);
}
