import React, { Component } from "react";
export default class SectorSelector extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sectors: [
				{ id: 1, value: "Healthcare", isChecked: false },
				{ id: 2, value: "Mining", isChecked: false },
				{ id: 3, value: "Financial Services", isChecked: false }
			]
		}
	}

	handleAllChecked = (event) => {
		let sectors = this.state.sectors
		sectors.forEach(sector => sector.isChecked = event.target.checked)
		this.setState({ sectors: sectors })
	}

	handleCheckChildElement = (event) => {
		let sectors = this.state.sectors
		sectors.forEach(sector => {
			if (sector.value === event.target.value)
				sector.isChecked = event.target.checked
		})
		this.setState({ sectors: sectors })
	}

	render() {
		return (
			<div>
				<CheckBox type="checkbox" handleCheckChildElement={this.handleAllChecked} id="5" value="checkAll" value="checkedall" />
				<ul class="ks-cboxtags">
					{
						this.state.sectors.map((sector) => {
							return (<CheckBox handleCheckChildElement={this.handleCheckChildElement}  {...sector} />)
						})
					}
				</ul>
			</div>
		);
	}
}

export const CheckBox = props => {
	return (
		<li class="checkbox">
			<input key={props.id} id={props.value + "Checkbox"} onClick={props.handleCheckChildElement} type="checkbox" checked={props.isChecked} value={props.value} /> <label for={props.value + "Checkbox"}>{props.value}</label>
		</li>
	)
}

//export class ToggleButton extends React.Component {
//	constructor(props) {
//		super(props)
//		this.state = {};
//	}

//	render() {
//		const { selected, toggleSelected, value } = this.props;
//		return (
//			<>
//				<button onClick={toggleSelected} className={selected ? "buttonSelected" : "button"}>{value}</ button>
//			</>
//		);
//	}
//}
