package model

type JsonRequest struct {
	Items []JsonRequestItems `json:"items"`
}

type JsonRequestItems struct {
	Id  string `json:"id"`
	Cap int `json:"capacity"`
	Point Point `json:"point"`
}
