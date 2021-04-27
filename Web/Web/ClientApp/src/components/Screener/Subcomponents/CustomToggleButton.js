import React from 'react';
import './CustomToggleButton.css';

export default class SectorButtons extends React.Component {

	render() {
		return(
			<div class="container">
				<ul class="ks-cboxtags">
					<li><input type="checkbox" id="checkboxOne" value="Rainbow Dash" /><label for="checkboxOne">Healthcare</label></li>
					<li><input type="checkbox" id="checkboxTwo" value="Rainbow Dash" /><label for="checkboxTwo">Mining</label></li>
					<li><input type="checkbox" id="checkboxThree" value="Rainbow Dash" /><label for="checkboxThree">Financial Services</label></li>
				</ul>
			</div>)
	}

}
