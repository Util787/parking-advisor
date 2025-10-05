import React from 'react';
import { Parking } from '../types/api';

interface ParkingCardProps {
  parking: Parking;
}

export const ParkingCard: React.FC<ParkingCardProps> = ({ parking }) => {
  const formatDuration = (seconds: number): string => {
    const minutes = Math.ceil(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">Parking {parking.id.slice(0, 8)}</h3>
          <p className="text-gray-600 text-sm">
            Location: {parking.point.lat}, {parking.point.lon}
          </p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              parking.is_paid ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
            }`}
          >
            {parking.is_paid ? 'Paid' : 'Free'}
          </span>
          {parking.duration > 0 && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              {formatDuration(parking.duration)}
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="font-medium">Capacity:</span> {parking.capacity}
        </div>
        <div>
          <span className="font-medium">Free Slots:</span>{' '}
          <span
            className={
              parking.free_parking_slots > 0 ? 'text-green-600 font-medium' : 'text-red-600'
            }
          >
            {parking.free_parking_slots}
          </span>
        </div>
      </div>
    </div>
  );
};