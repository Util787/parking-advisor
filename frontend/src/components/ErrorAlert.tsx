import React from 'react';

interface ErrorAlertProps {
  message: string;
  onClose: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  return (
    <div className="material-card p-6 border-l-4 border-red-500 bg-red-50">
      <div className="flex items-start gap-4">
        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-red-800 font-bold text-lg mb-2">Unable to Find Parking</h4>
          <p className="text-red-700">{message}</p>
          <button
            onClick={onClose}
            className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};