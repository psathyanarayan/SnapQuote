

import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = ({ message = "Oops! Something went wrong." }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-16 w-16 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Error Encountered
          </h2>
          <p className="mt-2 text-lg text-gray-600">{message}</p>
        </div>
        <div className="mt-8 bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <p className="text-base text-gray-500">
              We apologize for the inconvenience. Our team has been notified and is working on resolving the issue.
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;