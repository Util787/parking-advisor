package httpserver

import (
	_ "github.com/Util787/parking-advisor/docs"
	"github.com/Util787/parking-advisor/internal/config"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func (h *Handler) InitRoutes(env string) *gin.Engine {
	if env == config.EnvProd {
		gin.SetMode(gin.ReleaseMode)
	}
	router := gin.New()
	router.Use(gin.Recovery())

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	router.Use(cors.New(corsConfig))
	
	if env != config.EnvProd {
		router.Use(gin.Logger())
	}

	v1 := router.Group("/api/v1")

	v1.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	v1.Use(newBasicMiddleware(h.log))

	parkings := v1.Group("/parkings")
	{
		parkings.POST("", h.GetParkings)
	}

	return router
}
