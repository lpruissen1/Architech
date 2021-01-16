package database

import (
	"Logging"
	"context"
	"fmt"
	"time"

	"Backend/Model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func NewArchitechClient() DatabaseClient {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost"))
	if err != nil {
		fmt.Println("Error locating")
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)

	if err != nil {
		Logging.Write("Error Connecting to Architech DB", "DB")
	}

	return DatabaseClient{client.Database("Architech")}
}

func (client DatabaseClient) GetCustomIndex(objectID string) Model.CustomIndex {
	indexCollection := client.database.Collection("CustomIndices")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	id, err := primitive.ObjectIDFromHex(objectID)

	var index Model.CustomIndex
	err = indexCollection.FindOne(ctx, bson.M{"_id": id}).Decode(&index)

	if err != nil {
		Logging.Write("I fucked up reading index info", "DB")
	}

	return index
}

func (client DatabaseClient) InsertCustomIndex(index Model.CustomIndex) {
	indexCollection := client.database.Collection("CustomIndices")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	// we have to make sure the index is associated with a given user at some point
	_, err := indexCollection.InsertOne(ctx, index)

	if err != nil {
		Logging.Write("I fucked up inserting index info", "DB")
	}
}
