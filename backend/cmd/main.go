package main

import (
	"log/slog"
	"os"

	httpclient "github.com/Util787/parking-advisor/internal/adapters/http-client"
	httpserver "github.com/Util787/parking-advisor/internal/adapters/http-server"
	"github.com/Util787/parking-advisor/internal/config"
	"github.com/Util787/parking-advisor/internal/logger/slogpretty"
	"github.com/Util787/parking-advisor/internal/usecase"
)

// @title           Parking Advisor API
// @version         1.0
// @description     Rest api providing the most relevant parking options near the destination point.

// @BasePath  /api/v1

func main() {
	cfg := config.MustLoadConfig()

	log := setupLogger(cfg.Env)

	parkingUsecase := usecase.NewParkingUsecase(log)

	gisClient := httpclient.NewGisClient(log, cfg.HTTPClientConfig)

	parkingInfoClient := httpclient.NewParkingInfoClient(log, cfg.HTTPClientConfig)

	restServer := httpserver.NewHTTPServer(log, cfg.Env, cfg.HTTPServerConfig, &parkingUsecase, gisClient, parkingInfoClient)

	log.Info("Starting server", slog.Any("host", cfg.HTTPServerConfig.Host), slog.Any("port", cfg.HTTPServerConfig.Port))
	restServer.Run()
}

func setupLogger(env string) *slog.Logger {
	var log *slog.Logger

	switch env {
	case config.EnvLocal:
		log = slogpretty.NewPrettyLogger(os.Stdout, slog.LevelDebug)
	case config.EnvDev:
		log = slog.New(
			slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug}),
		)
	case config.EnvProd:
		log = slog.New(
			slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo}),
		)
	}

	return log
}
