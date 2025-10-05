export interface Point {
  lat: string;
  lon: string;
}

export interface Parking {
  id: string;
  point: Point;
  duration: number;
  capacity: number;
  free_parking_slots: number;
  is_paid: boolean;
}

export interface GetParkingsRequest {
  source_point: Point;
  destination_point: Point;
}

export interface ErrorResponse {
  message: string;
}