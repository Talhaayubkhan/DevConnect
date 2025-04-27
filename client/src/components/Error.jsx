import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion"; // for smooth animation

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-base-100 shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center space-y-6"
      >
        <div className="relative">
          <div className="text-error text-8xl font-extrabold opacity-10">
            404
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <svg
              className="w-20 h-20 text-error mb-4 animate-bounce"
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
            <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
              Oops! You're Lost
            </h1>
            <p className="text-base-content/70 text-sm md:text-base">
              We can't seem to find the page you're looking for.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="btn btn-outline btn-error flex-1"
          >
            🔙 Go Back
          </button>
          <Link to="/" className="btn btn-primary flex-1">
            🏠 Home Page
          </Link>
        </div>

        <div className="divider">Need Help?</div>

        <div className="text-sm text-base-content/70">
          <p>Something's wrong? Let's fix it!</p>
          <Link
            to="/contact"
            className="link link-primary underline font-semibold"
          >
            Contact Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Error;
