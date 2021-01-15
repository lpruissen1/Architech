package database

import (
	"Logging"
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Add logging to this class
type DatabaseClient struct {
	database *mongo.Database
}

func NewStockDataClient() DatabaseClient {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost"))
	if err != nil {
		fmt.Println("Error locating")
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)

	if err != nil {
		Logging.Write("Error Connecting to DB", "DB")
	}

	return DatabaseClient{client.Database("StockData")}
}

func NewArchitechClient() DatabaseClient {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost"))
	if err != nil {
		fmt.Println("Error locating")
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)

	if err != nil {
		Logging.Write("Error Connecting to DB", "DB")
	}

	return DatabaseClient{client.Database("Architech")}
}
