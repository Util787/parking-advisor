package usecase

import "github.com/Util787/parking-advisor/internal/models"

const getItemsMaxRetries = 3

// FilterFreeParkings returns only paid parkings
func (pu *ParkingUsecase) FilterFreeParkings(parkings []models.Parking) []models.Parking {
	res := make([]models.Parking, 0, len(parkings))

	for _, p := range parkings {
		if p.IsPaid {
			res = append(res, p)
		}
	}

	return res
}
