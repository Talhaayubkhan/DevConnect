import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

import useShowRequests from "../hooks/useShowRequestes";
const Requestes = () => {
  const { showFetchRequests } = useShowRequests();

  const handleAccept = async () => {
    console.log("Accept clicked");
  };

  const handleReject = async () => {
    console.log("Reject clicked");
  };

  if (!showFetchRequests)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <span className="loading loading-spinner loading-xl text-primary" />
      </div>
    );

  if (showFetchRequests.length === 0)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <h1 className="text-red-600 text-3xl font-semibold">
          No Requestes Found!
        </h1>
      </div>
    );

  return (
    <>
      <div className="px-4 md:px-10 lg:px-20 py-10">
        <h1 className="text-4xl font-bold text-center text-primary mb-10">
          Your Requestes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {showFetchRequests.map((request) => {
            const { _id, firstName, lastName, photoURL, age, about, gender } =
              request.fromUserId;

            return (
              <div className="card bg-base-100 shadow-xl border" key={_id}>
                <figure className="bg-neutral p-4">
                  <img
                    src={photoURL || "https://via.placeholder.com/150"}
                    alt={`${firstName}'s profile`}
                    className="w-24 h-24 object-cover rounded-full"
                  />
                </figure>
                <div className="card-body text-center">
                  <h2 className="card-title justify-center capitalize">
                    {firstName} {lastName}
                    <div className="badge badge-secondary">New</div>
                  </h2>
                  <p className="text-sm font-semibold text-white capitalize">
                    {about}
                  </p>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium text-primary">Gender:</span>{" "}
                      {gender}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-primary capitalize">
                        Age:
                      </span>{" "}
                      {age ? age : "N-A"}
                    </p>
                  </div>
                  <div className="flex justify-center gap-4 mt-2">
                    <button
                      className="btn btn-soft btn-primary font-semibold"
                      onClick={handleAccept}
                    >
                      <FaCheck /> Accept
                    </button>
                    <button
                      className="btn btn-soft btn-secondary font-semibold"
                      onClick={handleReject}
                    >
                      <MdCancel className="text-lg" /> Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Requestes;
