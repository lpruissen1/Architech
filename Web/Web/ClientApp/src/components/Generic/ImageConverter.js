import Button from "@material-ui/core/Button";
import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';

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

	const handleDelete = () => {
		setImage()
	}

	return (
		<Grid container spacing={4}>
			<Grid item xs={5}> 
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
			<Grid item xs={7} style={{ paddingLeft: 0 }}>
				{image &&
					<div style={{ display: 'flex', padding: 10, backgroundColor: '#545454', borderRadius: 8, justifyContent: 'center', position: 'relative' }}>
						<IconButton onClick={handleDelete} style={{ position: 'absolute', top:0, right: 0, outline: 'none'}}>
							<HighlightOffIcon style={{ color: '#d0d0d0'}} />
						</IconButton>
						<img src={image} style={{ maxHeight: 160, maxWidth: 160, margin: 0}} />
					</div>
				}
			</Grid>
		</Grid>
	);
}
