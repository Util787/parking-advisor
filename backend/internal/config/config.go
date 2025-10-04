package config

import (
	"time"

	"github.com/ilyakaznacheev/cleanenv"
	"github.com/joho/godotenv"
)

const (
	EnvLocal = "local"
	EnvDev   = "dev"
	EnvProd  = "prod"
)

type Config struct {
	Env              string        `yaml:"env" env:"ENV"`
	ShutdownTimeout  time.Duration `yaml:"shutdown-timeout" env:"SHUTDOWN_TIMEOUT"`
	HTTPServerConfig `yaml:"http-server"`
	HTTPClientConfig `yaml:"http-client"`
}

type HTTPServerConfig struct {
	Host              string        `yaml:"host" env:"HTTP_SERVER_HOST"`
	Port              int           `yaml:"port" env:"HTTP_SERVER_PORT"`
	ReadHeaderTimeout time.Duration `yaml:"read-header-timeout" env:"HTTP_SERVER_READ_HEADER_TIMEOUT"`
	WriteTimeout      time.Duration `yaml:"write-timeout" env:"HTTP_SERVER_WRITE_TIMEOUT"`
	ReadTimeout       time.Duration `yaml:"read-timeout" env:"HTTP_SERVER_READ_TIMEOUT"`
}

type HTTPClientConfig struct {
	Retries             int           `yaml:"retries" env:"HTTP_CLIENT_RETRIES"`
	Timeout             time.Duration `yaml:"timeout" env:"HTTP_CLIENT_TIMEOUT"`
	TwoGisApiKey        string        `yaml:"two-gis-api-key" env:"TWO_GIS_API_KEY"`
	TwoGisItemsURL      string        `yaml:"two-gis-items-url" env:"TWO_GIS_ITEMS_URL"`
	TwoGisDistMatrixURL string        `yaml:"two-gis-dist-matrix-url" env:"TWO_GIS_DIST_MATRIX_URL"`
}

func MustLoadConfig() *Config {
	err := godotenv.Load()
	if err != nil {
		panic("Failed to load .env file: " + err.Error())
	}

	var cfg Config

	err = cleanenv.ReadEnv(&cfg)
	if err != nil {
		panic("Error reading env: " + err.Error())
	}

	if cfg.Env == "" {
		panic("Env is not set")
	}

	if cfg.Env != EnvLocal && cfg.Env != EnvDev && cfg.Env != EnvProd {
		panic("Invalid env")
	}

	return &cfg
}
