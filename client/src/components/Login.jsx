// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { addUser } from "../app/slices/userSlice";
// import { BACKEND_BASE_URL } from "../lib/constant";
// import { useNavigate } from "react-router-dom";
// import { validateInputCredentials } from "../lib/helper";

// const Login = () => {
//   const [userFirstName, setUserFirstName] = useState("");
//   const [userLastName, setUserLastName] = useState("");
//   const [userEmail, setUserEmail] = useState("");
//   const [userPassword, setUserPassword] = useState("");
//   const [isLoginForm, setIsLoginForm] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLoginSubmit = async () => {
//     if (!validateInputCredentials(userEmail, userPassword)) return;

//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         BACKEND_BASE_URL + "/login",
//         {
//           emailId: userEmail,
//           password: userPassword,
//         },
//         { withCredentials: true }
//       );

//       toast.success("Login successful!");
//       dispatch(addUser(response.data));
//       navigate("/");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Login failed. Please try again."
//       );
//       console.error("Login error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center bg-base-100 my-25 px-4">
//       <div className="w-full max-w-md bg-base-200 rounded-xl shadow-md p-8 border border-base-300">
//         <h1 className="text-5xl font-bold text-primary text-center mb-3">
//           {isLoginForm ? "Login" : "Sign Up"}
//         </h1>
//         <div>
//           {!isLoginForm && (
//             <>
//               <div className="mb-5">
//                 <label className="label text-lg font-semibold mb-1">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your First Name"
//                   className="input input-bordered w-full"
//                   value={userFirstName}
//                   onChange={(e) => setUserFirstName(e.target.value)}
//                 />
//               </div>

//               <div className="mb-5">
//                 <label className="label text-lg font-semibold mb-1">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your Last Name"
//                   className="input input-bordered w-full"
//                   value={userLastName}
//                   onChange={(e) => setUserLastName(e.target.value)}
//                 />
//               </div>
//             </>
//           )}

//           <div className="mb-5">
//             <label className="label text-lg font-semibold mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="input input-bordered w-full"
//               value={userEmail}
//               onChange={(e) => setUserEmail(e.target.value)}
//             />
//           </div>

//           <div className="mb-6">
//             <label className="label text-lg font-semibold mb-1">Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="input input-bordered w-full"
//               value={userPassword}
//               onChange={(e) => setUserPassword(e.target.value)}
//             />
//           </div>

//           <button
//             className="btn btn-primary w-full text-xl mt-2"
//             onClick={handleLoginSubmit}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <span className="loading loading-spinner"></span>
//                 Logging in
//               </>
//             ) : (
//               "Login"
//             )}
//           </button>

//           <div className="text-center mt-4">
//             <span className="text-sm text-gray-500">
//               {isLoginForm
//                 ? "Don't have an account?"
//                 : "Already have an account?"}
//             </span>
//             <button
//               className="btn btn-link text-primary"
//               onClick={() => setIsLoginForm(!isLoginForm)}
//             >
//               {isLoginForm ? "Sign Up" : "Login"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addUser } from "../app/slices/userSlice";
import { BACKEND_BASE_URL } from "../lib/constant";
import { useNavigate } from "react-router-dom";
import { validateInputCredentials } from "../lib/helper";
import { FaUser, FaLock, FaEnvelope, FaUserPlus } from "react-icons/fa";

const Login = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
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

  const handleSignUpSubmit = async () => {
    if (
      !validateInputCredentials(
        userFirstName,
        userLastName,
        userEmail,
        userPassword
      )
    )
      return;
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/signup`,
        {
          firstName: userFirstName,
          lastName: userLastName,
          emailId: userEmail,
          password: userPassword,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      dispatch(addUser(response.data));
      toast.success("Sign up successful!");
      navigate("/profile");
    } catch (error) {
      console.error("ERROR: ", error);
      toast.error("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 flex items-center justify-center">
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
              <>Sign Up</>
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

export default Login;
