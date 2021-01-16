package API

import (
	database "Backend/Database"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type ApiClient struct {
	router *mux.Router
	db     database.DatabaseClient
}

func NewApiClient() ApiClient {
	r := mux.NewRouter()
	api := r.PathPrefix("/api/v1").Subrouter()
	return ApiClient{router: api, db: database.NewArchitechClient()}
}

func (api ApiClient) Initialize() {
	api.SetupCustomIndexRouting()
}

func (api ApiClient) Run() {
	fmt.Println("Listening on port 8081...")
	log.Fatal(http.ListenAndServe(":8081", api.router))
}

func (c *ApiClient) SetupCustomIndexRouting() {
	c.router.HandleFunc("/", c.get).Methods(http.MethodGet)
	c.router.HandleFunc("/", c.post).Methods(http.MethodPost)
	c.router.HandleFunc("/", c.delete).Methods(http.MethodDelete)
	c.router.HandleFunc("/", c.notFound)
	c.router.HandleFunc("/index/{indexID}", c.GetCustomIndex).Methods(http.MethodGet)
	c.router.HandleFunc("/index", c.PostCustomIndex).Methods(http.MethodPost)
}
