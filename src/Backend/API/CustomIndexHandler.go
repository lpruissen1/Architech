package API

import (
	"Logging"
	"encoding/json"
	"fmt"
	"net/http"

	apiModel "Backend/Model/API"

	"github.com/gorilla/mux"
)

func (c *ApiService) get(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "get called"}`))
}

func (c *ApiService) GetCustomIndex(w http.ResponseWriter, r *http.Request) {
	pathParams := mux.Vars(r)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var err error
	if val, ok := pathParams["indexID"]; ok {
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(`{"message": "need an indexID"}`))
			return
		}
		w.WriteHeader(http.StatusOK)

		index := c.db.GetCustomIndex(val)
		// todo: Map datatypes to API output
		json.NewEncoder(w).Encode(index)
	}
}

func (c *ApiService) PostCustomIndex(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	var index apiModel.CustomIndex
	err := json.NewDecoder(r.Body).Decode(&index)
	if err != nil {
		Logging.Write("I messed up decoding the posted custom index", "API")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"message": "FAILURE"}`))
		return
	}

	id := c.db.InsertCustomIndex(index)

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(fmt.Sprintf(`{"message": new object with ID: ` + id)))
}

func (c *ApiService) post(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(`{"message": "post called"}`))
}

func (c *ApiService) delete(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "delete called"}`))
}

func (c *ApiService) notFound(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)
	w.Write([]byte(`{"message": "not found"}`))
}
