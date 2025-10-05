import React from 'react';
import { Parking } from '../types/api';
import { ParkingCard } from './ParkingCard';

interface ParkingListProps {
  parkings: Parking[];
}

export const ParkingList: React.FC<ParkingListProps> = ({ parkings }) => {
  if (parkings.length === 0) {
    return (
      <div className="text-center py-12 material-card shadow-1">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🚗</span>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">No parkings found</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Try adjusting your search criteria or expand the search radius to find more parking options.
        </p>
      </div>
    );
  }

  // Sort parkings by free slots (descending) and duration (ascending)
  const sortedParkings = [...parkings].sort((a, b) => {
    if (b.free_parking_slots !== a.free_parking_slots) {
      return b.free_parking_slots - a.free_parking_slots;
    }
    return a.duration - b.duration;
  });

  const bestParking = sortedParkings[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Found {parkings.length} Parking(s)</h2>
          <p className="text-gray-600">Sorted by availability and drive time</p>
        </div>
        
        {bestParking && bestParking.free_parking_slots > 0 && (
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200">
            <div className="text-sm font-medium">Best Option: {bestParking.free_parking_slots} slots available</div>
          </div>
        )}
      </div>

      <div className="grid gap-4">
        {sortedParkings.map((parking, index) => (
          <div key={parking.id} className="relative">
            {index === 0 && bestParking.free_parking_slots > 0 && (
              <div className="absolute -top-2 -left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium z-10 shadow-lg">
                ⭐ Best Match
              </div>
            )}
            <ParkingCard parking={parking} />
          </div>
        ))}
      </div>
    </div>
  );
};