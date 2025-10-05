import React from 'react';
import { Parking } from '../types/api';

interface ParkingCardProps {
  parking: Parking;
  isBest?: boolean;
}

export const ParkingCard: React.FC<ParkingCardProps> = ({ parking, isBest }) => {
  const formatDuration = (seconds: number): string => {
    const minutes = Math.ceil(seconds / 60);
    if (minutes < 60) {
      return `${minutes} мин`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}ч ${remainingMinutes}м` : `${hours}ч`;
  };

  const getAvailabilityColor = (freeSlots: number, capacity: number) => {
    const percentage = (freeSlots / capacity) * 100;
    if (percentage === 0) return '#ef4444'; // red
    if (percentage < 30) return '#f59e0b'; // amber
    if (percentage < 60) return '#10b981'; // emerald
    return '#059669'; // green
  };

  const availabilityPercentage = (parking.free_parking_slots / parking.capacity) * 100;

  return (
    <div className={`material-card p-6 relative ${isBest ? 'ring-2 ring-green-500 ring-opacity-50' : ''}`}>
      {isBest && (
        <div className="absolute -top-3 -left-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg z-10">
          ⭐ Лучший вариант
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        {/* Left Section - Basic Info */}
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              parking.is_paid ? 'bg-amber-100' : 'bg-emerald-100'
            }`}>
              <span className={`text-2xl ${parking.is_paid ? 'text-amber-600' : 'text-emerald-600'}`}>
                {parking.is_paid ? '💳' : '🆓'}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                Парковка {parking.id.slice(0, 8)}
              </h3>
              <p className="text-gray-600 flex items-center gap-2">
                <span>📍</span>
                {parking.point.lat}, {parking.point.lon}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 font-medium">Вместимость</div>
              <div className="text-lg font-bold text-gray-800">{parking.capacity}</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 font-medium">Свободно</div>
              <div 
                className="text-lg font-bold"
                style={{ color: getAvailabilityColor(parking.free_parking_slots, parking.capacity) }}
              >
                {parking.free_parking_slots}
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 font-medium">Загруженность</div>
              <div className="text-lg font-bold text-gray-800">
                {Math.round(availabilityPercentage)}%
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Доступность</span>
              <span className="font-semibold">{parking.free_parking_slots}/{parking.capacity} мест</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="h-3 rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${availabilityPercentage}%`,
                  backgroundColor: getAvailabilityColor(parking.free_parking_slots, parking.capacity)
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Section - Duration and Status */}
        <div className="flex flex-col items-end gap-3">
          {parking.duration > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center min-w-[120px]">
              <div className="text-blue-600 text-sm font-semibold mb-1">В пути</div>
              <div className="text-2xl font-bold text-blue-700">{formatDuration(parking.duration)}</div>
            </div>
          )}
          
          <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
            parking.is_paid 
              ? 'bg-amber-100 text-amber-800 border border-amber-200' 
              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
          }`}>
            {parking.is_paid ? 'Платная парковка' : 'Бесплатная парковка'}
          </div>
        </div>
      </div>
    </div>
  );
};