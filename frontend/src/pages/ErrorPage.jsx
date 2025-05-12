import React from "react";

const NotFoundPage = () => {
  return (
    <div className="font-['Inter'] bg-gray-50 text-gray-800 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        {/* Illustration */}
        <div className="mb-8">
          <svg
            className="w-48 h-48 mx-auto"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="#F3F4F6"
              stroke="#E5E7EB"
              strokeWidth="4"
            />
            <path
              d="M70 70L130 130M130 70L70 130"
              stroke="#EF4444"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M100 50V60M100 140V150M50 100H60M140 100H150"
              stroke="#6B7280"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl font-bold text-gray-600 mb-2">404</h1>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Page Not Found
        </h2>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/shop">Go to Shop</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
