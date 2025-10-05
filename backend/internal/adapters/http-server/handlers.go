package httpserver

import (
	"log/slog"
	"net/http"

	httpclient "github.com/Util787/parking-advisor/internal/adapters/http-client"
	"github.com/Util787/parking-advisor/internal/models"
	"github.com/gin-gonic/gin"
)

const (
	defaultRadius = 500
)

type Handler struct {
	log               *slog.Logger
	parkingUsecase    parkingUsecase
	gisClient         *httpclient.GisClient
	parkingInfoClient *httpclient.ParkingInfoClient
}

type parkingUsecase interface {
	FilterFreeParkings(parkings []models.Parking) []models.Parking
}

type GetParkingsRequest struct {
	SourcePoint models.Point `json:"source_point" binding:"required"`
	DestPoint   models.Point `json:"destination_point" binding:"required"`
	Radius      int          `json:"radius" binding:"required"`
}

// GetParkings godoc
// @Summary      Find nearby parkings and return their info
// @Description  Finds parkings near the provided destination point, filters only free parkings and enriches them with additional info (distance, slots, etc.).
// @Tags         parkings
// @Accept       json
// @Produce      json
// @Param        request  body  GetParkingsRequest  true  "request body"
// @Success      200  {array}  models.Parking
// @Failure      404  {object}  errorResponse
// @Failure      400  {object}  errorResponse
// @Failure      500  {object}  errorResponse
// @Router       /parkings [post]
func (h *Handler) GetParkings(c *gin.Context) {
	var req GetParkingsRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		newErrorResponse(c, h.log, http.StatusBadRequest, "invalid request", err)
		return
	}

	var radius = req.Radius
	if radius == 0 {
		radius = defaultRadius
	}
	var sourcePoint = req.SourcePoint
	var destPoint = req.DestPoint

	// TODO: add retry logic here

	parkings, err := h.gisClient.GetParkingsInPointRadius(radius, destPoint)
	if len(parkings) == 0 {
		newErrorResponse(c, h.log, http.StatusNotFound, "parkings not found", err)
		return
	}
	if err != nil {
		newErrorResponse(c, h.log, http.StatusInternalServerError, "failed to fetch from external api", err)
		return
	}

	parkings = h.parkingUsecase.FilterFreeParkings(parkings)

	parkings, err = h.parkingInfoClient.GetParkingInfo(parkings, sourcePoint, destPoint)
	if err != nil {
		newErrorResponse(c, h.log, http.StatusInternalServerError, "failed to fetch from external api", err)
		return
	}

	c.JSON(http.StatusOK, parkings)
}
