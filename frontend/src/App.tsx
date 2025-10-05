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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-3">
            <span className="text-3xl text-white">🅿️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Parking Advisor
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find the perfect parking spot near your destination with real-time availability and drive times
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

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>Powered by React • Material Design • Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default App;