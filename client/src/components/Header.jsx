import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../utils/constant";
import { toast } from "react-toastify";
import { removeUser } from "../utils/slices/userSlice";

const Header = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BACKEND_BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      toast.success("Logout successful. See you again!");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed. Please try again.");
    }
  };

  if (!userData) return;

  return (
    <div className="navbar bg-gradient-to-r from-blue-800 to-indigo-900">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-primary-content flex items-center gap-1 mx-4">
            <span className="text-2xl">🧑‍💻</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
              DevConnect
            </span>
          </span>
        </Link>
      </div>

      <div className="flex gap-5 mx-5 items-center">
        <div className="hidden md:flex">
          <p className="text-white text-lg font-semibold capitalize">
            Welcome,{" "}
            <span className="text-cyan-300 font-bold">
              {userData.firstName}
            </span>
          </p>
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-circle btn-ghost avatar online ring ring-primary ring-offset-2 ring-offset-base-100 hover:scale-105 transition-all"
          >
            <div className="w-12 rounded-full">
              <img
                src={userData.photoURL}
                alt="user_logo"
                className="object-cover"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu dropdown-content z-10 mt-4 w-56 rounded-box bg-base-200 p-3 shadow-lg"
          >
            <li className="mb-1">
              <Link
                to="/profile"
                className="flex items-center p-3 hover:bg-base-300 rounded-lg font-medium"
              >
                {/* 👤 Profile Icon */}
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14c-4 0-8 2-8 6h16c0-4-4-6-8-6zm0-2a4 4 0 100-8 4 4 0 000 8z"
                  />
                </svg>
                Profile
                <span className="badge badge-primary badge-sm ml-auto">
                  New
                </span>
              </Link>
            </li>

            <li className="mb-1">
              <Link
                to="/connections"
                className="flex items-center p-3 hover:bg-base-300 rounded-lg font-medium"
              >
                {/* 🤝 Connections Icon */}
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 8a6 6 0 00-12 0v4a6 6 0 0012 0V8z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 14v1a4 4 0 004 4h4a4 4 0 004-4v-1"
                  />
                </svg>
                Connections
              </Link>

              <Link
                to="/requestes"
                className="flex items-center p-3 hover:bg-base-300 rounded-lg font-medium"
              >
                {/* 📨 Request Icon */}
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Requests
              </Link>
            </li>

            <div className="divider my-1" />

            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-3 text-error hover:bg-base-300 rounded-lg font-medium w-full"
              >
                {/* 🚪 Logout Icon */}
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
