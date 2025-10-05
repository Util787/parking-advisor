package main

import (
	"github.com/Util787/parking-advisor/backend/mock-api/internal/controller"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.POST("/mock", controller.HandleMock)
	router.Run(":8080")
}