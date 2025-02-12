// src/pages/NotFound.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">Page Not Found</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default NotFound;
