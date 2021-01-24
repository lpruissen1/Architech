package main

import "Backend/API"

func main() {
	api := API.NewApiService()
	api.Initialize()
	api.Run()
}
