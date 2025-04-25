import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { setFeedList } from "../app/slices/feedSlice";
import { BACKEND_BASE_URL } from "../lib/constant";
import ShowFeedUsers from "./ShowFeedUsers";

const Feed = () => {
  const showFeedUsers = useSelector((store) => store?.feed?.feed);
  // console.log(showFeedUsers);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const fetchFeedData = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/feed`, {
        withCredentials: true,
      });

      dispatch(setFeedList(response?.data));
    } catch (error) {
      console.error("Error while fetching feed:", error);
      toast.error(
        "⚠️ Unable to load your feed at the moment. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[50vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-primary" />
      </div>
    );
  }

  if (!showFeedUsers || showFeedUsers.length === 0) {
    return (
      <div className="h-[50vh] flex justify-center items-center">
        <h1 className="text-2xl font-semibold text-red-500">
          No Feed Users Available
        </h1>
      </div>
    );
  }

  return (
    <div className="py-4">
      <h1 className="text-4xl font-bold text-primary text-center mb-4">
        Explore Feed
      </h1>
      <div className="flex justify-center mb-15">
        <ShowFeedUsers user={showFeedUsers[0]} />
      </div>
    </div>
  );
};

export default Feed;
