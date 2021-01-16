package main

import (
	API "Backend/API"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	api := r.PathPrefix("/api/v1").Subrouter()
	API.SetupCustomIndexRouting(api)
	fmt.Println("Listening on port 8081...")
	log.Fatal(http.ListenAndServe(":8081", api))
}
