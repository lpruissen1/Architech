package main

import "Backend/API"

func main() {
	api := API.NewApiClient()
	api.Initialize()
	api.Run()
}
