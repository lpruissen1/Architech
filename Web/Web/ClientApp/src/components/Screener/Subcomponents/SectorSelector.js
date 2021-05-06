import React, { Component } from "react";
import CheckBox from './CheckBox.js';
import './SectorSelector.css';

export default class SectorSelector extends Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}

	handleAllChecked = (event) => {
		let sectors = this.props.sectors
		sectors.forEach(sector => sector.isChecked = event.target.checked)
		this.setState({ sectors: sectors })
		this.props.handleUpdate()
	}

	handleCheckChildElement = (event) => {
		let sectors = this.props.sectors
		sectors.forEach(sector => {
			if (sector.value === event.target.value)
				sector.isChecked = event.target.checked
		})
		this.setState({ sectors: sectors })
		this.props.handleUpdate()
	}

	render() {
		return (
			<div className = "sectorSelectorContainer">
				<ul className="ks-cboxtags">
					<CheckBox type="checkbox" handleCheckChildElement={this.handleAllChecked} id="5" value="Check/Uncheck All" />
					{
						this.props.sectors && this.props.sectors.map((sector) => {
							return (<CheckBox key={sector.value} handleCheckChildElement={this.handleCheckChildElement}  {...sector} />)
						})
					}
				</ul>
			</div>
		);
	}
}

