import React, { Component } from 'react';
import SectorSelector from './SectorSelector';

export class ScreeningControls extends Component {
	static displayName = ScreeningControls.name;

	render() {
		return (
			<div>
				<SectorSelector />
			</div>
		);
	}
}
