package models

type Parking struct {
	Id               string `json:"id"`
	Point            Point  `json:"point"`
	Duration         int    `json:"duration"`
	Capacity         int    `json:"capacity"`
	FreeParkingSlots int    `json:"free_parking_slots"`
	IsPaid           bool   `json:"is_paid"`
}
