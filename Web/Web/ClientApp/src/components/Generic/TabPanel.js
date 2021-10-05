import PropTypes from 'prop-types';
import React from 'react';

export default function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div>
			{value === index && props.children}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};
