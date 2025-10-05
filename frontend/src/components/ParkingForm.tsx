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
    return sourcePoint.lat.trim() && sourcePoint.lon.trim() && 
           destPoint.lat.trim() && destPoint.lon.trim();
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
    <div className="material-card p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <span className="text-white text-xl">🎯</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Find Parking Spots</h2>
          <p className="text-gray-600">Enter your current location and destination</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Source Point */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-800">Start Location</h3>
            </div>
            
            <div className="input-group">
              <label className="input-label">Latitude</label>
              <input
                type="text"
                placeholder="e.g., 55.7558"
                value={sourcePoint.lat}
                onChange={(e) => setSourcePoint({ ...sourcePoint, lat: e.target.value })}
                className="material-input"
                required
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Longitude</label>
              <input
                type="text"
                placeholder="e.g., 37.6173"
                value={sourcePoint.lon}
                onChange={(e) => setSourcePoint({ ...sourcePoint, lon: e.target.value })}
                className="material-input"
                required
              />
            </div>
          </div>

          {/* Destination Point */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-800">Destination</h3>
            </div>
            
            <div className="input-group">
              <label className="input-label">Latitude</label>
              <input
                type="text"
                placeholder="e.g., 55.7558"
                value={destPoint.lat}
                onChange={(e) => setDestPoint({ ...destPoint, lat: e.target.value })}
                className="material-input"
                required
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Longitude</label>
              <input
                type="text"
                placeholder="e.g., 37.6173"
                value={destPoint.lon}
                onChange={(e) => setDestPoint({ ...destPoint, lon: e.target.value })}
                className="material-input"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isFormValid()}
          className="material-button w-full text-lg font-semibold"
        >
          {loading ? (
            <>
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Searching for Parking...
            </>
          ) : (
            <>
              <span className="text-xl">🔍</span>
              Find Available Parking
            </>
          )}
        </button>
      </form>
    </div>
  );
};