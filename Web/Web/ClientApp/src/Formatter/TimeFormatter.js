
const TimePeriodFormatter = (timePeriod) => {
	if (timePeriod === 'Quarter') {
		return 'One Quarter'
	}
	else if (timePeriod === 'HalfYear') {
		return 'Two Quarters'
	}
	else if (timePeriod === 'Year') {
		return 'One Year'
	}
	else if (timePeriod === "ThreeYear") {
		return "Three Years"
	}
	else
		return "Five Years"
}

export default TimePeriodFormatter
