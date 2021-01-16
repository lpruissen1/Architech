package API

import (
	"Backend/Model"
	"Logging"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func (c *ApiClient) get(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "get called"}`))
}

func (c *ApiClient) GetCustomIndex(w http.ResponseWriter, r *http.Request) {
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
	fmt.Println(indexID)
	w.Write([]byte(`{"message": "got indexId"}`))
}

func (c *ApiClient) PostCustomIndex(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	var index Model.CustomIndex
	err := json.NewDecoder(r.Body).Decode(&index)
	if err != nil {
		Logging.Write("I messed up decoding the posted custom index", "API")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"message": "FAILURE"}`))
		return
	}

	w.Write([]byte(fmt.Sprintf(`{"message": I posted a custom index,}`)))
}

func (c *ApiClient) post(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(`{"message": "post called"}`))
}

func (c *ApiClient) delete(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "delete called"}`))
}

func (c *ApiClient) notFound(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)
	w.Write([]byte(`{"message": "not found"}`))
}
