package httpclient

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"strconv"

	"github.com/Util787/parking-advisor/internal/common"
	"github.com/Util787/parking-advisor/internal/models"
)

type TwoGisItemsResp struct {
	Result struct {
		Items []struct {
			Capacity struct {
				Total string `json:"total"`
			} `json:"capacity"`
			Id     string `json:"id"`
			IsPaid bool   `json:"is_paid"`
			Point  struct {
				Lat float64 `json:"lat"`
				Lon float64 `json:"lon"`
			} `json:"point"`
			Type string `json:"type"`
		} `json:"items"`
	} `json:"result"`
}

func (hc *GisClient) GetParkingsInPointRadius(radius int, point models.Point) ([]models.Parking, error) {
	var resp TwoGisItemsResp

	hc.log.Debug("sending request to 2gis items api", slog.Any("radius", radius), slog.Any("point", point))

	req := hc.client.R().SetQueryParams(map[string]string{"radius": strconv.Itoa(radius), "point": point.Lon + "," + point.Lat, "type": "parking", "fields": "items.capacity,items.point,items.is_paid", "sort": "distance"})
	hc.log.Debug("request SetQueryParams", slog.Any("request", req))

	restyResp, err := req.Get(hc.twoGisItemsURL)

	slog.Debug("got response from 2gis items api", slog.Any("response", resp), slog.Any("status_code", restyResp.StatusCode()))

	if err != nil {
		return nil, fmt.Errorf("%s :error getting parkings from 2gis: %w", common.GetOperationName(), err)
	}

	if restyResp.StatusCode() != 200 {
		return nil, fmt.Errorf("%s :non-200 status code from 2gis: %d", common.GetOperationName(), restyResp.StatusCode())
	}

	err = json.Unmarshal(restyResp.Body(), &resp)
	if err != nil {
		return nil, fmt.Errorf("%s :error unmarshalling 2gis response: %w", common.GetOperationName(), err)
	}

	parkings := make([]models.Parking, 0, len(resp.Result.Items))
	for _, item := range resp.Result.Items {
		if item.Type != "parking" {
			continue
		}

		cap, err := strconv.Atoi(item.Capacity.Total)
		if err != nil {
			continue
		}

		parkings = append(parkings, models.Parking{
			Id:       item.Id,
			Point:    models.Point{Lat: strconv.FormatFloat(item.Point.Lat, 'f', -1, 64), Lon: strconv.FormatFloat(item.Point.Lon, 'f', -1, 64)},
			Capacity: cap,
			IsPaid:   item.IsPaid,
		})
	}

	slog.Debug("test", slog.Any("parkings", parkings))

	return parkings, nil
}
