package main

import (
	"github.com/Util787/parking-advisor/backend/mock-api/internal/controller"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	router.Use(cors.New(corsConfig))

	router.POST("/mock", controller.HandleMock)
	router.Run(":8080")
}
