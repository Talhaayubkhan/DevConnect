import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addUser } from "../app/slices/userSlice";
import { BACKEND_BASE_URL } from "../lib/constant";
import { useNavigate } from "react-router-dom";
import { validateInputCredentials } from "../lib/helper";
import { FaUser, FaLock, FaEnvelope, FaUserPlus } from "react-icons/fa";

const Auth = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userPhotoURL, setUserPhotoURL] = useState("");

  const [userSkills, setUserSkills] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    if (!validateInputCredentials(userEmail, userPassword)) return;

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BACKEND_BASE_URL}/login`,
        {
          emailId: userEmail,
          password: userPassword,
        },
        { withCredentials: true }
      );

      toast.success("Login successful!");
      dispatch(addUser(response?.data?.data));
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

  const handleSignUpSubmit = async () => {
    const skillsArray = userSkills.split(",").map((skill) => skill.trim());
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/signup`,
        {
          firstName: userFirstName,
          lastName: userLastName,
          emailId: userEmail,
          password: userPassword,
          skills: skillsArray,
          gender: userGender,
          photoURL: userPhotoURL,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(response?.data?.data));
      toast.success("Sign up successful!");
      navigate("/profile");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "SignUp failed. Please try again."
      );
      console.error("ERROR: ", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 flex items-center justify-center mt-5 mb-10">
      <div className="w-full max-w-lg bg-base-300 border border-base-200 rounded-4xl shadow-3xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-primary mb-5">
          {isLoginForm ? "Welcome Back 👋" : "Create Account 🙏"}
        </h1>

        <div className="space-y-5">
          {!isLoginForm && (
            <>
              <div className="form-control">
                <label className="label font-semibold">First Name</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Your First Name"
                    className="input input-bordered pl-10 w-full"
                    value={userFirstName}
                    onChange={(e) => setUserFirstName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label font-semibold">Last Name</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Your Last Name"
                    className="input input-bordered pl-10 w-full"
                    value={userLastName}
                    onChange={(e) => setUserLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label font-semibold">
                  Skills (comma-separated)
                </label>
                <div className="relative">
                  <FaUserPlus className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="e.g. React, Node.js, MongoDB"
                    className="input input-bordered pl-10 w-full"
                    value={userSkills}
                    onChange={(e) => setUserSkills(e.target.value)}
                  />
                </div>
              </div>
              {/* Gender Selection */}
              <div className="form-control">
                <label className="label font-semibold">Gender</label>
                <select
                  className="select select-bordered w-full"
                  value={userGender}
                  onChange={(e) => setUserGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Photo URL Input */}
              <div className="form-control">
                <label className="label font-semibold">
                  Profile Photo URL (optional)
                </label>
                <div className="relative">
                  <FaUserPlus className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="https://example.com/photo.jpg"
                    className="input input-bordered pl-10 w-full"
                    value={userPhotoURL}
                    onChange={(e) => setUserPhotoURL(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <div className="form-control">
            <label className="label font-semibold">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered pl-10 w-full"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label font-semibold">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered pl-10 w-full"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={isLoginForm ? handleLoginSubmit : handleSignUpSubmit}
            disabled={isLoading}
            className="btn btn-primary w-full text-lg mt-4"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner"></span>
                Processing...
              </>
            ) : isLoginForm ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>

          <div className="flex justify-center items-center text-gray-400">
            {isLoginForm ? "Don't have an account?" : "Already registered?"}
            <button
              onClick={() => setIsLoginForm(!isLoginForm)}
              className="text-primary ml-1 font-bold underline cursor-pointer"
            >
              {isLoginForm ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
