import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="relative">
          <div className="text-error text-9xl font-bold opacity-10">404</div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <svg
              className="w-24 h-24 text-error mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-base-content/70 mb-8">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-outline flex-1"
              >
                Go Back
              </button>
              <Link to="/" className="btn btn-primary flex-1">
                Return Home
              </Link>
            </div>
          </div>
        </div>
        <div className="divider my-8"></div>
        <div className="text-base-content/70">
          <p>Need assistance? Contact our support team.</p>
          <Link to="/contact" className="link link-primary">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
