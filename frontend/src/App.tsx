import React, { useState } from 'react';
import { ParkingForm } from './components/ParkingForm';
import { ParkingList } from './components/ParkingList';
import { ErrorAlert } from './components/ErrorAlert';
import { parkingApi } from './services/api';
import { Parking, GetParkingsRequest } from './types/api';

const App: React.FC = () => {
  const [parkings, setParkings] = useState<Parking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (request: GetParkingsRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await parkingApi.getParkings(request);
      setParkings(result);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while searching for parkings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Parking Advisor
          </h1>
          <p className="text-gray-600">
            Find the best parking spots near your destination
          </p>
        </header>

        <div className="mb-8">
          <ParkingForm onSubmit={handleSearch} loading={loading} />
        </div>

        {error && (
          <ErrorAlert
            message={error}
            onClose={() => setError(null)}
          />
        )}

        <ParkingList parkings={parkings} />
      </div>
    </div>
  );
};

export default App;