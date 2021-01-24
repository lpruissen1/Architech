package apiModel

import "go.mongodb.org/mongo-driver/bson/primitive"

type CustomIndex struct {
	ID                  primitive.ObjectID
	Markets             []string
	DivYield            DividendYield
	Volitility          Volitility
	TrailingPerformance TrailingPerformance
	SectorAndIndustry   Sectors
	MarketCaps          MarketCaps
	Test                string
}

type ComposedMarkets struct {
	Markets []string
}

type DividendYield struct {
	Upper float32
	Lower float32
}

type Volitility struct {
	Method string
	Upper  float32
	Lower  float32
}

type TrailingPerformance struct {
	TimePeriod int
	Upper      float32
	Lower      float32
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
	Upper int
	Lower int
}

type RevenueGrowth struct {
	TimePeriod int
	Upper      int
	Lower      int
}

type EarningsGrowth struct {
	TimePeriod int
	Upper      int
	Lower      int
}
