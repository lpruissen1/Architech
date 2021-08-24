import Button from "@material-ui/core/Button";
import React, {useState} from 'react'

export default function ImageInput(props) {

	const [image, setImage] = useState()

	const convert = (e) => {
		debugger
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
		<>
			<img src={image}/>
			<input
				accept="image/*"
				style={{
					display: "none"
				}}
				id="button-file"
				type="file"
				onChange={convert}
			/>
			<label htmlFor="button-file">
				<Button
					variant="contained"
					color="primary"
					component="span"
				>
					Add Additional Images
         </Button>
			</label>
		</>
	);
}
