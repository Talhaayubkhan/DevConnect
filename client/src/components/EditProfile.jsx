import React, { useState } from "react";
import ShowFeedUsers from "./ShowFeedUsers";
import axios from "axios";
import { BACKEND_BASE_URL } from "../lib/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../app/slices/userSlice";
import { toast } from "react-toastify";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoURL, setphotoURL] = useState(user?.photoURL || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  // const [userPassword, setUserPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateProfileDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${BACKEND_BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          photoURL,
          about,
          gender,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(response?.data?.data));
      toast.success("User Profile Update Successfully!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error: ", error.message);
      toast.error("Error Occur while Updating Profile....");
    }
  };

  return (
    <>
      <div className="bg-base-100 flex gap-5 justify-center items-center">
        <div className="w-full mt-10 max-w-sm bg-base-200 rounded-xl shadow-md p-5">
          <h1 className="text-4xl font-bold text-primary text-center mb-2">
            Edit Profile
          </h1>
          <div className="mt-5">
            <div className="mb-2">
              <label className="label text-lg font-semibold">First Name</label>
              <input
                type="text"
                placeholder="Enter your First Name"
                className="input input-bordered w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="label text-lg font-semibold">Last Name</label>
              <input
                type="text"
                placeholder="Enter your Last Name"
                className="input input-bordered w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="label text-lg font-semibold">Photo URL</label>
              <input
                type="text"
                placeholder="Enter your Photo URL"
                className="input input-bordered w-full"
                value={photoURL}
                onChange={(e) => setphotoURL(e.target.value)}
              />
            </div>
            {/* 
              <div className="mb-2">
                <label className="label text-lg font-semibold">Password</label>
                <input
                  type="password"
                  placeholder="Enter your Password"
                  className="input input-bordered w-full"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </div> */}

            <div className="form-control w-full mb-2">
              <label className="label">
                <span className="label-text text-lg font-semibold">Gender</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonbinary">Trans-Gender</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div className="mb-1">
              <label className="label text-lg font-semibold">About</label>
              <textarea
                placeholder="Enter your About"
                className="textarea textarea-bordered w-full"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>
            <div className="text-center mt-6">
              <button
                className="btn btn-primary w-full"
                onClick={handleUpdateProfileDetails}
              >
                {isLoading ? "Saving Profile..." : "Save Profile"}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-15">
          <ShowFeedUsers
            user={{ firstName, lastName, photoURL, about, gender }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
