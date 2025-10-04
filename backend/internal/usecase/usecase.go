package usecase

import "log/slog"

type ParkingUsecase struct {
	log *slog.Logger
	
}

func NewParkingUsecase(log *slog.Logger) ParkingUsecase {
	return ParkingUsecase{log: log}
}
