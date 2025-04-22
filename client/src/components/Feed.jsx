import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { addFeed } from "../utils/slices/feedSlice";
import { BACKEND_BASE_URL } from "../utils/constant";
import ShowFeedUsers from "./ShowFeedUsers";

const Feed = () => {
  const showFeedUsers = useSelector((store) => store?.feed?.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFeedData = async () => {
      if (showFeedUsers) return;
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}/feed`, {
          withCredentials: true,
        });

        dispatch(addFeed(response.data));
      } catch (error) {
        console.error("Error while fetching feed:", error);
        toast.error(
          "⚠️ Unable to load your feed at the moment. Please try again later."
        );
      }
    };

    fetchFeedData();
  }, []);

  if (!showFeedUsers) return;

  return (
    <div className="pb-25">
      <ShowFeedUsers user={showFeedUsers[0]} />
    </div>
  );
};

export default Feed;
