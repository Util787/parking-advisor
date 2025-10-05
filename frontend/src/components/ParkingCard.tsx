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

  const getAvailabilityColor = (freeSlots: number, capacity: number) => {
    const percentage = (freeSlots / capacity) * 100;
    if (percentage === 0) return 'var(--error)';
    if (percentage < 20) return 'var(--warning)';
    return 'var(--success)';
  };

  return (
    <div className="material-card shadow-2 p-4 mb-4 border-l-4" 
         style={{ borderLeftColor: getAvailabilityColor(parking.free_parking_slots, parking.capacity) }}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-800">Parking {parking.id.slice(0, 8)}</h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                parking.is_paid 
                  ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              {parking.is_paid ? '💳 Paid' : '🆓 Free'}
            </span>
          </div>
          <p className="text-gray-600 text-sm flex items-center gap-1">
            <span>📍</span>
            {parking.point.lat}, {parking.point.lon}
          </p>
        </div>
        
        {parking.duration > 0 && (
          <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg border border-blue-200">
            <div className="text-xs font-medium text-blue-600">Drive time</div>
            <div className="text-sm font-semibold">{formatDuration(parking.duration)}</div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-600 font-medium">Capacity</div>
          <div className="text-lg font-semibold text-gray-800">{parking.capacity}</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-600 font-medium">Available</div>
          <div 
            className="text-lg font-semibold"
            style={{ color: getAvailabilityColor(parking.free_parking_slots, parking.capacity) }}
          >
            {parking.free_parking_slots}
          </div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-600 font-medium">Occupancy</div>
          <div className="text-lg font-semibold text-gray-800">
            {Math.round((parking.free_parking_slots / parking.capacity) * 100)}%
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Availability</span>
          <span>{parking.free_parking_slots}/{parking.capacity}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${(parking.free_parking_slots / parking.capacity) * 100}%`,
              backgroundColor: getAvailabilityColor(parking.free_parking_slots, parking.capacity)
            }}
          />
        </div>
      </div>
    </div>
  );
};