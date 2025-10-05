import React from 'react';
import { Parking } from '../types/api';
import { ParkingCard } from './ParkingCard';

interface ParkingListProps {
  parkings: Parking[];
  loading: boolean;
}

export const ParkingList: React.FC<ParkingListProps> = ({ parkings, loading }) => {
  if (loading) {
    return (
      <div className="material-card p-12 text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Searching for parking</h3>
        <p className="text-gray-500">Scanning nearby areas for available spots...</p>
      </div>
    );
  }

  if (parkings.length === 0) {
    return (
      <div className="material-card p-12 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🚗</span>
        </div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-3">No parking spots found</h3>
        <p className="text-gray-500 text-lg max-w-md mx-auto mb-6">
          We couldn't find any available parking spots matching your criteria. Try adjusting your location or search radius.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-blue-700 text-sm">
            💡 <strong>Tip:</strong> Try expanding your search area or checking different time periods
          </p>
        </div>
      </div>
    );
  }

  // Sort by free slots (descending) and duration (ascending)
  const sortedParkings = [...parkings].sort((a, b) => {
    if (b.free_parking_slots !== a.free_parking_slots) {
      return b.free_parking_slots - a.free_parking_slots;
    }
    return a.duration - b.duration;
  });

  const bestParking = sortedParkings[0];

  return (
    <div className="space-y-6">
      <div className="material-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Found {parkings.length} Parking Spot{parkings.length !== 1 ? 's' : ''}
            </h2>
            <p className="text-gray-600">Sorted by availability and drive time</p>
          </div>
          
          {bestParking && bestParking.free_parking_slots > 0 && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg">
              <div className="text-sm font-semibold">⭐ Best Option Available</div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {sortedParkings.map((parking, index) => (
          <ParkingCard 
            key={parking.id} 
            parking={parking} 
            isBest={index === 0 && parking.free_parking_slots > 0}
          />
        ))}
      </div>
    </div>
  );
};