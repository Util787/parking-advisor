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
      setError(err.message || 'An error occurred while searching for parkings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-3xl text-white">🅿️</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Parking Advisor
          </h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto leading-relaxed">
            Find the perfect parking spot with real-time availability and optimal routes
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-8">
          <ParkingForm onSubmit={handleSearch} loading={loading} />
          
          {error && (
            <ErrorAlert
              message={error}
              onClose={() => setError(null)}
            />
          )}

          <ParkingList parkings={parkings} loading={loading} />
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-blue-200 text-sm">
            Powered by React • Material Design • Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;