import axios from "axios";
import React, { useState } from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import { BACKEND_BASE_URL } from "../lib/constant";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../app/slices/feedSlice";

const ShowFeedUsers = ({ user }) => {
  const [isLoading, setIsLoading] = useState({ id: null, action: null });
  const dispatch = useDispatch();
  const { firstName, lastName, photoURL, gender, about, _id } = user;

  if (!user) return null;

  const handleUserDecision = async (status, _id) => {
    setIsLoading({ id: _id, action: status });
    const targetName = `${firstName} ${lastName}`;

    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      if (response?.data) {
        // Handle user feedback with toast
        if (status === "interested") {
          toast.success(`You showed interest in ${targetName}`);
        } else if (status === "ignored") {
          toast.info(`You ignored ${targetName}`);
        }

        // Remove from feed
        dispatch(removeUserFromFeed(_id));
      } else {
        toast.error(`❌ Something went wrong. Please try again.`);
      }
    } catch (error) {
      console.error("Error while sending response:", error);
      toast.error("⚠️ Failed to send your response. Please try again.");
    } finally {
      setIsLoading({ id: null, action: null });
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-base-100 rounded-2xl shadow-md overflow-hidden ring-1 ring-gray-700">
      <img
        src={photoURL || "https://via.placeholder.com/400x300"}
        alt={`${firstName}'s profile`}
        className="w-full h-80 object-cover rounded-t-2xl"
      />
      <div className="p-6 space-y-3 text-white">
        <h2 className="text-2xl font-bold capitalize flex items-center gap-2">
          {firstName} {lastName}
          <span className="badge badge-secondary text-black">NEW</span>
        </h2>
        <p className="text-sm text-gray-300">
          <strong className="text-primary">Gender:</strong> {gender}
        </p>
        <p className="text-sm italic">{about}</p>

        <div className="flex justify-between mt-6">
          {/* Interested Button */}
          <button
            onClick={() => handleUserDecision("interested", _id)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white cursor-pointer font-semibold px-5 py-2 rounded-lg transition"
            disabled={isLoading.id === _id}
          >
            {isLoading.id === _id && isLoading.action === "interested" ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <>
                <FaHeart className="text-xl text-pink-400" />
                Interested
              </>
            )}
          </button>

          {/* Ignored Button */}
          <button
            onClick={() => handleUserDecision("ignored", _id)}
            className="flex items-center gap-2 border border-red-600 hover:bg-red-700 hover:text-white cursor-pointer text-red-400 font-semibold px-5 py-2 rounded-lg transition"
            disabled={isLoading.id === _id}
          >
            {isLoading.id === _id && isLoading.action === "ignored" ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <>
                <FaTimes className="text-xl" />
                Ignored
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowFeedUsers;
