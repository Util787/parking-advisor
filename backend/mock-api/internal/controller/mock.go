package controller

import (
	"log"
	"math/rand"
	"net/http"

	"github.com/Util787/parking-advisor/backend/mock-api/internal/model"
	"github.com/gin-gonic/gin"
)

func HandleMock(c *gin.Context) {
	req := &model.JsonRequest{}
	if err := c.Bind(req); err != nil {
		log.Printf("error binding request json: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid json structure"})
		return
	}

	resp := &model.JsonResponse{}
	for _, item := range req.Items {
		resp.Items = append(resp.Items, model.JsonResponseItems{
			Id: item.Id,
			Available: generateRandomOccupied(item.Cap),
			Point: item.Point,
		})
	}

	c.JSON(http.StatusOK, resp)
}

func generateRandomOccupied(cap int) (avaible int) {
	occupied := rand.Float64() * float64(cap)
	avaible = cap - int(occupied)

	return avaible
}