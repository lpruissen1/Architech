import React, { Component } from "react";
import CheckBox from './CheckBox.js';
import './SectorSelector.css';

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
			<div className = "sectorSelectorContainer">
				<ul class="ks-cboxtags">
					<CheckBox type="checkbox" handleCheckChildElement={this.handleAllChecked} id="5" value="Check/Uncheck All" />
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
