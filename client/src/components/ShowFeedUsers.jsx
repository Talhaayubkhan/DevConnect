import React from "react";

const ShowFeedUsers = ({ user }) => {
  const { firstName, lastName, photoURL, gender, about } = user;

  return (
    <div className="card w-96 bg-black text-white  shadow-sm mx-auto my-3">
      <figure>
        <img src={photoURL} alt={`${firstName} ${lastName}`} />
      </figure>

      <div className="card-body ">
        <h2 className="card-title capitalize">
          {firstName} {lastName}
          <div className="badge badge-info">NEW</div>
        </h2>

        <p className="text-sm font-semibold text-white capitalize">{gender}</p>

        <p className="text-base text-white capitalize">{about}</p>

        <div className="card-actions justify-center mt-3">
          <div className="btn btn-outline btn-success btn-sm">Interested</div>
          <div className="btn btn-outline btn-error btn-sm">Ignored</div>
        </div>
      </div>
    </div>
  );
};

export default ShowFeedUsers;
