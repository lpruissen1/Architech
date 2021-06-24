import React, { Component } from "react";
import CheckBox from './CheckBox.js';
import './SectorSelector.css';
import Button from '@material-ui/core/Button';


export default class SectorSelector extends Component {
	handleAllChecked = (event) => {
		let sectors = this.props.sectors
		sectors.forEach(sector => sector.isChecked = event.target.checked)
		this.setState({})
		this.props.handleUpdate()
	}

	handleCheckChildElement = (event) => {
		let sectors = this.props.sectors
		sectors.forEach(sector => {
			if (sector.value === event.target.value)
				sector.isChecked = event.target.checked
		})
		this.setState({})
		this.props.handleUpdate()
	}

	render() {
		return (
			<div className = "sectorSelectorContainer">
				<ul className="ks-cboxtags">
					<CheckBox type="checkbox" handleCheckChildElement={this.handleAllChecked} id="5" value="Toggle All Sectors" />
					{
						this.props.sectors && this.props.sectors.map((sector) => {
							return (<CheckBox key={sector.value} handleCheckChildElement={this.handleCheckChildElement}  {...sector} />)
						})
					}
				</ul>
				<Button>Filter By Industry</Button>
			</div>
		);
	}
}

