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

func (gc *GisClient) GetParkingsInPointRadius(radius int, point models.Point) ([]models.Parking, error) {
	var resp TwoGisItemsResp

	gc.log.Debug("sending request to 2gis items api", slog.Any("radius", radius), slog.Any("point", point))

	req := gc.client.R().SetQueryParams(map[string]string{"radius": strconv.Itoa(radius), "point": point.Lon + "," + point.Lat, "type": "parking", "fields": "items.capacity,items.point,items.is_paid", "sort": "distance"})
	gc.log.Debug("request SetQueryParams", slog.Any("request", req))

	restyResp, err := req.Get(gc.twoGisItemsURL)

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

	return parkings, nil
}

type ParkingInfoReq struct {
	StartPoint models.Point `json:"start_point"`
	EndPoint   models.Point `json:"end_point"`
	Items      []struct {
		Id       string       `json:"id"`
		Capacity int          `json:"capacity"`
		Point    models.Point `json:"point"`
	} `json:"items"`
}

type ParkingInfoResp struct {
	Items []struct {
		Id        string       `json:"id"`
		Available int          `json:"available"`
		Point     models.Point `json:"point"`
	} `json:"items"`
}

func (pc *ParkingInfoClient) GetParkingInfo(parkings []models.Parking, sourcePoint models.Point, destPoint models.Point) ([]models.Parking, error) {
	var reqBody ParkingInfoReq
	reqBody.Items = make([]struct {
		Id       string       `json:"id"`
		Capacity int          `json:"capacity"`
		Point    models.Point `json:"point"`
	}, len(parkings))

	reqBody.StartPoint = sourcePoint
	reqBody.EndPoint = destPoint
	for i, p := range parkings {
		reqBody.Items[i].Id = p.Id
		reqBody.Items[i].Capacity = p.Capacity
		reqBody.Items[i].Point = p.Point
	}

	pc.log.Debug("sending request to parking info api", slog.Any("request", reqBody))

	resp, err := pc.client.R().
		SetHeader("Content-Type", "application/json").
		SetBody(reqBody).
		Post(pc.ParkingInfoURL)

	if err != nil {
		return nil, fmt.Errorf("%s :error getting parkings from 2gis: %w", common.GetOperationName(), err)
	}

	if resp.StatusCode() != 200 {
		return nil, fmt.Errorf("%s :non-200 status code from 2gis: %d", common.GetOperationName(), resp.StatusCode())
	}

	var respBody ParkingInfoResp
	err = json.Unmarshal(resp.Body(), &respBody)
	if err != nil {
		return nil, fmt.Errorf("%s :error unmarshalling parking info response: %w", common.GetOperationName(), err)
	}

	for i := range respBody.Items {
		parkings[i].FreeParkingSlots = respBody.Items[i].Available
	}

	return parkings, nil
}
