package model

type JsonResponse struct {
	Items []JsonResponseItems `json:"items"`
}

type JsonResponseItems struct {
	Id string `json:"id"`
	Available int `json:"available"`
	Point Point `json:"point"`
}