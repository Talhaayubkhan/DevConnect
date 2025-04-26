import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import useShowRequests from "../hooks/useShowRequestes";
import { BACKEND_BASE_URL } from "../lib/constant";
import { removeConnectionRequestById } from "../app/slices/requestSlice";

const Requests = () => {
  const [loadingState, setLoadingState] = useState({ id: null, action: null });
  const { showFetchRequests, isRequestsLoading } = useShowRequests();
  const dispatch = useDispatch();

  const reviewingRequests = async (status, _id) => {
    setLoadingState({ id: _id, action: status });
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      console.log(response.data.data);

      if (response.data.data.status === 200) {
        dispatch(removeConnectionRequestById(_id));
        toast.success(
          `Request ${status === "Accepted" ? "Accepted" : "Rejected"}!`
        );
      } else {
        toast.error("Failed to update request");
        console.error("Failed:", response.statusText);
      }
    } catch (error) {
      toast.error("Error updating request");
      console.error("Error accepting request:", error);
    } finally {
      setLoadingState({ id: null, action: null });
    }
  };

  if (isRequestsLoading)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <span className="loading loading-spinner loading-xl text-primary" />
      </div>
    );

  if (showFetchRequests.length === 0)
    return (
      <div className="flex justify-center items-center h-[75vh]">
        <h1 className="text-red-600 text-4xl font-semibold">
          No Requests Found!
        </h1>
      </div>
    );

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10">
      <h1 className="text-4xl font-bold text-center text-primary mb-10">
        Your Requests
      </h1>

      <div className="space-y-6 mb-20">
        <AnimatePresence>
          {showFetchRequests.map((request) => {
            const { _id, firstName, lastName, photoURL, age, about, gender } =
              request.fromUserId;

            return (
              <motion.div
                key={_id}
                layout
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 0.95 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row items-center bg-base-100 shadow-md rounded-2xl border border-gray-700 p-4 gap-4"
              >
                <img
                  src={photoURL || "https://via.placeholder.com/150"}
                  alt={`${firstName}'s profile`}
                  className="w-24 h-24 object-cover rounded-full border-4 border-primary"
                />

                <div className="flex-1 text-center sm:text-left space-y-2">
                  <h2 className="text-lg font-bold text-white capitalize">
                    {firstName} {lastName}
                    <span className="ml-2 badge badge-secondary">New</span>
                  </h2>
                  <p className="text-sm text-white font-semibold">{about}</p>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium text-primary">Gender:</span>{" "}
                      {gender}
                    </p>
                    <p>
                      <span className="font-medium text-primary">Age:</span>{" "}
                      {age || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-4 sm:mt-0">
                  <button
                    className="btn btn-primary font-bold flex items-center gap-2"
                    onClick={() => reviewingRequests("accepted", request._id)}
                  >
                    {loadingState.id === request._id &&
                    loadingState.action === "accepted" ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      <>
                        <FaCheck /> Accepted
                      </>
                    )}
                  </button>

                  <button
                    className="btn btn-error font-bold flex items-center gap-2"
                    onClick={() => reviewingRequests("rejected", request._id)}
                  >
                    {loadingState.id === request._id &&
                    loadingState.action === "rejected" ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      <>
                        <MdCancel className="text-xl" /> Rejected
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Requests;
