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
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Source Point</h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Latitude"
              value={sourcePoint.lat}
              onChange={(e) => setSourcePoint({ ...sourcePoint, lat: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              placeholder="Longitude"
              value={sourcePoint.lon}
              onChange={(e) => setSourcePoint({ ...sourcePoint, lon: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Destination Point</h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Latitude"
              value={destPoint.lat}
              onChange={(e) => setDestPoint({ ...destPoint, lat: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              placeholder="Longitude"
              value={destPoint.lon}
              onChange={(e) => setDestPoint({ ...destPoint, lon: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={loading || !isFormValid()}
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors duration-200 font-medium"
      >
        {loading ? 'Searching...' : 'Find Parkings'}
      </button>
    </form>
  );
};