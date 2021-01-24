package Mappers

import (
	apiModel "Backend/Model/API"
	dbModel "Backend/Model/DB"
)

func MapCustomIndexToDatabaseModel(apiResponse apiModel.CustomIndex) dbModel.CustomIndex {
	return dbModel.CustomIndex{
		Markets: apiResponse.Markets,
	}
}
