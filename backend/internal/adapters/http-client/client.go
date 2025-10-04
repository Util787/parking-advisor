package httpclient

import (
	"log/slog"

	"github.com/Util787/parking-advisor/internal/config"
	"github.com/go-resty/resty/v2"
)

type HttpClient struct {
	log                 *slog.Logger
	client              *resty.Client
	twoGisItemsURL      string
	twoGisDistMatrixURL string
}

func NewHttpClient(log *slog.Logger, cfg config.HTTPClientConfig) *HttpClient {

	client := resty.New()

	client = client.SetTimeout(cfg.Timeout)
	client = client.SetRetryCount(cfg.Retries)

	client = client.SetQueryParam("key", cfg.TwoGisApiKey)

	return &HttpClient{
		log:                 log,
		client:              client,
		twoGisItemsURL:      cfg.TwoGisItemsURL,
		twoGisDistMatrixURL: cfg.TwoGisDistMatrixURL,
	}
}
