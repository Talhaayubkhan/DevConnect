import React from "react";

const ShowFeedUsers = ({ user }) => {
  const { firstName, lastName, photoURL, gender, about } = user;

  return (
    <>
      <div className="flex justify-center items-center mt-5">
        <div className="card bg-base-200 w-88 shadow-sm">
          <figure className="bg-black">
            <img src={photoURL} alt="phot_url" />
          </figure>
          <div className="card-body text-white">
            <h2 className="card-title capitalize text-xl">
              {firstName} {lastName}
              <div className="badge badge-secondary font-bold text-black">
                NEW
              </div>
            </h2>
            <p className="capitalize font-semibold">{gender}</p>
            <p className="capitalize">{about}</p>
            <div className="card-actions justify-center font-bold items-center mt-4">
              <div className="badge badge-outline p-4 bg-primary text-lg">
                Interested
              </div>
              <div className="badge badge-outline p-4 bg-secondary text-lg">
                Ignored
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowFeedUsers;
