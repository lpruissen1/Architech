package model

type customIndex struct {
	Markets             ComposedMarkets
	DivYield            DividendYield
	Volitility          Volitility
	TrailingPerformance TrailingPerformance
	SectorAndIndustry   Sectors
	MarketCaps          MarketCaps
}

type ComposedMarkets struct {
	markets []string
}

type DividendYield struct {
	upper float32
	lower float32
}

type Volitility struct {
	method string
	upper  float32
	lower  float32
}

type TrailingPerformance struct {
	TimePeriod int
	upper      float32
	lower      float32
}

type Sectors struct {
	Sectors []Sector
}

type Sector struct {
	Sector     string
	Industries []string
}

type MarketCaps struct {
	MarketCaps []MarketCap
}

type MarketCap struct {
	upper int
	lower int
}
