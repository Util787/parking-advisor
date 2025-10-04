package httpclient

import (
	"log/slog"

	"github.com/Util787/parking-advisor/internal/config"
	"github.com/go-resty/resty/v2"
)

type GisClient struct {
	log                 *slog.Logger
	client              *resty.Client
	twoGisItemsURL      string
	twoGisDistMatrixURL string
}

func NewGisClient(log *slog.Logger, cfg config.HTTPClientConfig) *GisClient {

	client := resty.New()

	client = client.SetTimeout(cfg.Timeout)
	client = client.SetRetryCount(cfg.Retries)

	client = client.SetQueryParam("key", cfg.TwoGisApiKey)

	return &GisClient{
		log:                 log,
		client:              client,
		twoGisItemsURL:      cfg.TwoGisItemsURL,
		twoGisDistMatrixURL: cfg.TwoGisDistMatrixURL,
	}
}
