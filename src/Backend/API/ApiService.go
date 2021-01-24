package API

import (
	database "Backend/Database"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type ApiService struct {
	Router *mux.Router
	db     database.DatabaseClient
}

func NewApiService() ApiService {
	r := mux.NewRouter()
	api := r.PathPrefix("/api/v1").Subrouter()
	return ApiService{Router: api, db: database.NewArchitechClient()}
}

func (api ApiService) Initialize() {
	api.SetupCustomIndexRouting()
}

func (api ApiService) Run() {
	fmt.Println("Listening on port 8081...")
	// log.Fatal(http.ListenAndServe(":8081", api.Router))
	log.Fatal(http.ListenAndServe(":8081", handlers.CORS(handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"*"}))(api.Router)))
}

func (c *ApiService) SetupCustomIndexRouting() {
	c.Router.HandleFunc("/", c.get).Methods(http.MethodGet)
	c.Router.HandleFunc("/", c.post).Methods(http.MethodPost)
	c.Router.HandleFunc("/", c.delete).Methods(http.MethodDelete)
	c.Router.HandleFunc("/", c.notFound)
	c.Router.HandleFunc("/index/{indexID}", c.GetCustomIndex).Methods(http.MethodGet)
	c.Router.HandleFunc("/index", c.PostCustomIndex).Methods(http.MethodPost)
}
