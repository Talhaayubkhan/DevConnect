import axios from "axios";
import TinderCard from "react-tinder-card";
import { BACKEND_BASE_URL } from "../lib/constant";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../app/slices/feedSlice";

const ShowFeedUsers = ({ user, index, isSwipeCard = true }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, photoURL, gender, about, _id } = user;

  if (!user) return null;

  const handleUserDecision = async (status, _id) => {
    const targetName = `${firstName} ${lastName}`;

    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      if (response?.data) {
        if (status === "interested") {
          toast.success(`❤️ You showed interest in ${targetName}`);
        } else if (status === "ignored") {
          toast.info(`❌ You ignored ${targetName}`);
        }
        dispatch(removeUserFromFeed(_id));
      } else {
        toast.error(`❌ Something went wrong. Please try again.`);
      }
    } catch (error) {
      console.error("Error while sending response:", error);
      toast.error("⚠️ Failed to send your response. Please try again.");
    }
  };

  const onSwipe = (direction) => {
    if (direction === "right") {
      handleUserDecision("interested", _id);
    } else if (direction === "left") {
      handleUserDecision("ignored", _id);
    }
  };

  return (
    <TinderCard
      onSwipe={isSwipeCard ? onSwipe : ""}
      preventSwipe={["up", "down"]}
      flickOnSwipe={isSwipeCard}
      disableRightSwipe={true}
      swipeRequirementType="velocity"
      swipeThreshold={400}
      className={`${
        isSwipeCard ? "absolute" : ""
      } flex justify-center items-center`}
      style={{
        zIndex: 100 - index,
        transition: "transform 0.3s ease-out",
        pointerEvents: isSwipeCard ? "auto" : "none",
      }}
    >
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
        </div>
      </div>
    </TinderCard>
  );
};

export default ShowFeedUsers;
