package httpserver

import (
	"github.com/Util787/parking-advisor/internal/config"
	"github.com/gin-gonic/gin"
)

func (h *Handler) InitRoutes(env string) *gin.Engine {
	if env == config.EnvProd {
		gin.SetMode(gin.ReleaseMode)
	}
	router := gin.New()
	router.Use(gin.Recovery())

	if env != config.EnvProd {
		router.Use(gin.Logger())
	}

	v1 := router.Group("/api/v1")
	v1.Use(NewBasicMiddleware(h.log))

	parkings := v1.Group("/parkings")
	{
		parkings.GET("", h.GetParkings)
	}

	return router
}
