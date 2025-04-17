import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          emailId: userEmail,
          password: userPassword,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Login successful!");

      // console.log(response);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );

      console.error("Login error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-20 w-full">
        <fieldset className="card bg-base-200 border border-base-300 px-6 py-8 mt-5 rounded-box shadow-lg w-96">
          <legend className="font-bold text-5xl text-primary px-2">
            Login
          </legend>

          <label className="label font-semibold text-2xl">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />

          <label className="label font-semibold text-2xl pt-5">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <div className="pt-5 flex justify-center">
            <button
              className="btn btn-primary mt-4 text-xl px-8"
              onClick={handleLoginSubmit}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default Login;
