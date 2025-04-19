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
        {
          withCredentials: true,
        }
      );

      dispatch(removeUser());
      toast.success("Logout successful. See you again!");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="navbar bg-gradient-to-r from-blue-800 to-indigo-900 shadow-xl rounded-b-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">
          <span className="text-primary-content flex items-center gap-2">
            <span className="text-3xl">🧑‍💻</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
              DevConnect
            </span>
          </span>
        </Link>
      </div>

      {userData && (
        <div className="flex gap-3 mx-5 items-center">
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
              className="btn btn-circle btn-ghost avatar online ring ring-primary ring-offset-2 ring-offset-base-100 transition-all hover:scale-105"
            >
              <div className="w-12 rounded-full">
                <img
                  alt="user_logo"
                  src={userData.photoURL}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                  <span className="badge badge-primary badge-sm ml-auto">
                    New
                  </span>
                </Link>
              </li>
              <li className="mb-1">
                <a className="flex items-center p-3 hover:bg-base-300 rounded-lg font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </a>
              </li>
              <div className="divider my-1"></div>
              <li>
                <a
                  className="flex items-center p-3 text-error hover:bg-base-300 rounded-lg font-medium"
                  onClick={handleLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
