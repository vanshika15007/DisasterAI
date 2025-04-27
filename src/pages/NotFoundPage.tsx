import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, MessageSquare } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6 flex justify-center">
          <AlertTriangle size={64} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <Home size={18} className="mr-2" />
            Return Home
          </Link>
          <Link
            to="/chatbot"
            className="bg-teal-600 text-white px-4 py-2 rounded-md font-medium flex items-center justify-center hover:bg-teal-700 transition-colors"
          >
            <MessageSquare size={18} className="mr-2" />
            Ask AI Assistant
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;