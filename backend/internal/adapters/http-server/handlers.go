package httpserver

import (
	"log/slog"

	httpclient "github.com/Util787/parking-advisor/internal/adapters/http-client"
	"github.com/Util787/parking-advisor/internal/models"
	"github.com/gin-gonic/gin"
)

const (
	defaultRadius   = 500
	getItemsRetries = 3
	radiusIncrement = 200
)

type Handler struct {
	log            *slog.Logger
	parkingUsecase parkingUsecase
	gisClient      *httpclient.GisClient
}

type parkingUsecase interface {
	FilterFreeParkings(parkings []models.Parking) []models.Parking
}

type getParkingsRequest struct {
	SourcePoint models.Point `json:"source_point" binding:"required"`
	DestPoint   models.Point `json:"destination_point" binding:"required"`
}

func (h *Handler) GetParkings(c *gin.Context) {
	var req getParkingsRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		newErrorResponse(c, h.log, 400, "invalid request", err)
		return
	}

	var radius = defaultRadius

	// TODO: add retry logic here

	parkings, err := h.gisClient.GetParkingsInPointRadius(radius, req.DestPoint)
	if err != nil {
		newErrorResponse(c, h.log, 500, "failed to fetch from external api", err)
	}

	parkings = h.parkingUsecase.FilterFreeParkings(parkings)

	c.JSON(200, parkings)
}
