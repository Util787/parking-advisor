import React from 'react';
import { Parking } from '../types/api';
import { ParkingCard } from './ParkingCard';

interface ParkingListProps {
  parkings: Parking[];
}

export const ParkingList: React.FC<ParkingListProps> = ({ parkings }) => {
  if (parkings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No parkings found. Try adjusting your search criteria.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Found {parkings.length} Parking(s)</h2>
      {parkings.map((parking) => (
        <ParkingCard key={parking.id} parking={parking} />
      ))}
    </div>
  );
};