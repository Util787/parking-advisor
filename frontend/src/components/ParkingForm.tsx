import React, { useState } from 'react';
import { Point, GetParkingsRequest } from '../types/api';

interface ParkingFormProps {
  onSubmit: (request: GetParkingsRequest) => void;
  loading: boolean;
}

export const ParkingForm: React.FC<ParkingFormProps> = ({ onSubmit, loading }) => {
  const [sourcePoint, setSourcePoint] = useState<Point>({ lat: '', lon: '' });
  const [destPoint, setDestPoint] = useState<Point>({ lat: '', lon: '' });

  const isFormValid = () => {
    return sourcePoint.lat && sourcePoint.lon && destPoint.lat && destPoint.lon;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit({
        source_point: sourcePoint,
        destination_point: destPoint,
      });
    }
  };

  return (
    <div className="material-card shadow-3 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">🚗</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Find Parking Spots</h2>
          <p className="text-gray-600 text-sm">Enter your current location and destination</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <label className="font-medium">Start Location</label>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Latitude (e.g., 55.7558)"
                value={sourcePoint.lat}
                onChange={(e) => setSourcePoint({ ...sourcePoint, lat: e.target.value })}
                className="material-input w-full"
                required
              />
              <input
                type="text"
                placeholder="Longitude (e.g., 37.6173)"
                value={sourcePoint.lon}
                onChange={(e) => setSourcePoint({ ...sourcePoint, lon: e.target.value })}
                className="material-input w-full"
                required
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <label className="font-medium">Destination</label>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Latitude (e.g., 55.7558)"
                value={destPoint.lat}
                onChange={(e) => setDestPoint({ ...destPoint, lat: e.target.value })}
                className="material-input w-full"
                required
              />
              <input
                type="text"
                placeholder="Longitude (e.g., 37.6173)"
                value={destPoint.lon}
                onChange={(e) => setDestPoint({ ...destPoint, lon: e.target.value })}
                className="material-input w-full"
                required
              />
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading || !isFormValid()}
          className="material-button w-full py-3 text-base"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Searching for Parkings...
            </>
          ) : (
            <>
              <span>🔍</span>
              Find Available Parkings
            </>
          )}
        </button>
      </form>
    </div>
  );
};