import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store?.user);

  if (!user) return <div className="text-center py-8">Loading profile...</div>;
  return (
    <div className="pt-8 pb-25">
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
