// import React from "react";

// const ShowFeedUsers = ({ user }) => {
//   const { firstName, lastName, photoURL, gender, about } = user;

//   return (
//     <>
//       <div className="flex justify-center items-center mt-5">
//         <div className="card bg-base-200 w-88 shadow-sm">
//           <figure className="bg-black">
//             <img src={photoURL} alt="phot_url" />
//           </figure>
//           <div className="card-body text-white">
//             <h2 className="card-title capitalize text-xl">
//               {firstName} {lastName}
//               <div className="badge badge-secondary font-bold text-black">
//                 NEW
//               </div>
//             </h2>
//             <p className="capitalize font-semibold">{gender}</p>
//             <p className="capitalize">{about}</p>
//             <div className="card-actions justify-center font-bold items-center mt-4">
//               <div className="badge badge-outline p-4 bg-primary text-lg">
//                 Interested
//               </div>
//               <div className="badge badge-outline p-4 bg-secondary text-lg">
//                 Ignored
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ShowFeedUsers;

import React from "react";

const ShowFeedUsers = ({ user }) => {
  if (!user) return null;

  const { firstName, lastName, photoURL, gender, about } = user;

  return (
    <div className="w-full max-w-sm bg-base-200 rounded-xl shadow-lg overflow-hidden mb-20">
      <div className="bg-black flex justify-center items-center">
        <img
          src={photoURL || "https://via.placeholder.com/400x300"}
          alt={`${firstName}'s profile`}
          className="w-full h-80 object-cover rounded-t-xl"
        />
      </div>
      <div className="p-6 text-white space-y-2">
        <h2 className="text-2xl font-bold capitalize flex items-center gap-2">
          {firstName} {lastName}
          <span className="badge badge-secondary text-black">NEW</span>
        </h2>
        <p className="capitalize font-medium text-sm">
          Gender: <span className="text-primary">{gender}</span>
        </p>
        <p className="capitalize text-sm">{about}</p>

        <div className="flex justify-between mt-4">
          <button className="btn btn-primary btn-sm px-6">Interested</button>
          <button className="btn btn-outline btn-sm px-6">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default ShowFeedUsers;
