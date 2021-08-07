const NumberFormatter = (num, ruleType) => {
	debugger
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

	else if (ruleType === "DividendYield") {
		return num.toFixed(2) + '%'
	}

	else if (ruleType === "RevenueGrowthAnnualized") {
		return num.toFixed(2) + '%'
	}

	else if (ruleType === "EPSGrowthAnnualized") {
		return num.toFixed(2) + '%'
	}

	else {
		return num.toFixed(2)
	}
}

export default NumberFormatter
