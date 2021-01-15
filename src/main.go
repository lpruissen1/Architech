package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func get(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "get called"}`))
}

func getParams(w http.ResponseWriter, r *http.Request) {
	pathParams := mux.Vars(r)
	w.Header().Set("Content-Type", "application/json")

	indexID := -1
	var err error
	if val, ok := pathParams["indexID"]; ok {
		indexID, err = strconv.Atoi(val)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(`{"message": "need an indexID"}`))
			return
		}
	}

	w.Write([]byte(fmt.Sprintf(`{"message": Recieved you indexID of: %d,}`, indexID)))
}

func post(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(`{"message": "post called"}`))
}

func delete(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "delete called"}`))
}

func notFound(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)
	w.Write([]byte(`{"message": "not found"}`))
}

func main() {
	r := mux.NewRouter()
	api := r.PathPrefix("/api/v1").Subrouter()
	api.HandleFunc("/", get).Methods(http.MethodGet)
	api.HandleFunc("/", post).Methods(http.MethodPost)
	api.HandleFunc("/", delete).Methods(http.MethodDelete)
	api.HandleFunc("/", notFound)

	api.HandleFunc("/index/{indexID}", getParams).Methods(http.MethodGet)
	fmt.Println("Listening on port 8081...")
	log.Fatal(http.ListenAndServe(":8081", api))
}
