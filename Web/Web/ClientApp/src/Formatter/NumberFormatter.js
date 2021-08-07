const NumberFormatter = (num, ruleType) => {

	if (ruleType === "MarketCap") {
		if (num > 1000000 && num < 1000000000) {
			return '$' + (num / 1000000).toFixed(0) + 'M';
		} else if (num >= 1000000000 && num < 1000000000000) {
			return '$' + (num / 1000000000).toFixed(0) + 'B';
		} else if (num >= 1000000000000) {
			return '$' + (num / 1000000000000).toFixed(2) + 'T';
		} else if (num > 9999 && num < 100000) {
			return '< $0.1M';
		} else if (num < 10000) {
			return '$' + num
		}
	}

	else if (ruleType === "CoefficientOfVariation") {
		return num
	}

	else {
		return num.toFixed(2) + '%'
	}
}

export default NumberFormatter
