import TimeFormatter from './TimeFormatter.js';

const RuleTextFormatter = (ruleType, timePeriod) => {
	
	if (ruleType === "PriceToEarningsRatioTTM") {
		return "P/E Ratio (ttm)"
	}

	else if (ruleType === "PriceToSalesRatioTTM") {
		return "P/S Ratio (ttm)"
	}

	else if (ruleType === "TrailingPerformanceAnnualized") {
		return "Trailing Performance (" + TimeFormatter(timePeriod) + ")"
	}

	else if (ruleType === "RevenueGrowthAnnualized") {
		return "Revenue Growth (" + TimeFormatter(timePeriod) + ")"
	}

	else if (ruleType === "EPSGrowthAnnualized") {
		return "EPS Growth (" + TimeFormatter(timePeriod) + ")"
	}

	else if (ruleType === "CoefficientOfVariation") {
		return "Coeff. Variation (" + TimeFormatter(timePeriod) + ")"
	}

	else {
		return ruleType.split(/(?=[A-Z])/).join(" ")
	}
}

export default RuleTextFormatter
