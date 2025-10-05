import React from 'react';

interface ErrorAlertProps {
  message: string;
  onClose: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      <span className="block sm:inline">{message}</span>
      <button
        onClick={onClose}
        className="absolute top-0 right-0 px-4 py-3"
      >
        ×
      </button>
    </div>
  );
};