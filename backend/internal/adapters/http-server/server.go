package httpserver

import (
	"context"
	"log/slog"
	"net/http"
	"strconv"

	httpclient "github.com/Util787/parking-advisor/internal/adapters/http-client"
	"github.com/Util787/parking-advisor/internal/config"
)

type Server struct {
	httpServer *http.Server
}

func NewHTTPServer(log *slog.Logger, env string, cfg config.HTTPServerConfig, parkingUsecase parkingUsecase, gisClient *httpclient.GisClient) *Server {
	handler := Handler{
		log:            log,
		parkingUsecase: parkingUsecase,
		gisClient:      gisClient,
	}

	httpServer := &http.Server{
		Addr:              cfg.Host + ":" + strconv.Itoa(cfg.Port),
		Handler:           handler.InitRoutes(env),
		MaxHeaderBytes:    1 << 20, // 1 MB
		ReadHeaderTimeout: cfg.ReadHeaderTimeout,
		WriteTimeout:      cfg.WriteTimeout,
		ReadTimeout:       cfg.ReadTimeout,
	}

	return &Server{
		httpServer: httpServer,
	}
}

func (s *Server) Run() error {
	return s.httpServer.ListenAndServe()
}

func (s *Server) Shutdown(ctx context.Context) error {
	return s.httpServer.Shutdown(ctx)
}
