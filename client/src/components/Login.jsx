import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addUser } from "../utils/slices/userSlice";
import { BACKEND_BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { validateInputCredentials } from "../utils/helper";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    if (!validateInputCredentials(userEmail, userPassword)) return;

    try {
      setIsLoading(true);
      const response = await axios.post(
        BACKEND_BASE_URL + "/login",
        {
          emailId: userEmail,
          password: userPassword,
        },
        { withCredentials: true }
      );

      toast.success("Login successful!");
      dispatch(addUser(response.data));
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-base-100 my-25 px-4">
      <div className="w-full max-w-md bg-base-200 rounded-xl shadow-md p-8 border border-base-300">
        <h1 className="text-5xl font-bold text-primary text-center mb-8">
          Login
        </h1>

        <div className="mb-5">
          <label className="label text-lg font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="label text-lg font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-full text-xl mt-2"
          onClick={handleLoginSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner"></span>
              Logging in
            </>
          ) : (
            "Login"
          )}
        </button>
      </div>
    </div>
  );
};

export default Login;
