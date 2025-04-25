import { toast } from "react-toastify";
import { setConnectionRequests } from "../app/slices/connectionSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_BASE_URL } from "../lib/constant";
import axios from "axios";

const useShowConnections = () => {
  const showCurrentConnections = useSelector((store) => store?.connections);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const fetchCurrentUserConnections = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(BACKEND_BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      //     console.log(response?.data?.connectedUsers);

      dispatch(setConnectionRequests(response?.data?.connectedUsers));
    } catch (error) {
      console.error("Error fetching connections:", error.message);
      // Handle error (e.g., show a toast notification)
      toast.error("Error fetching connections. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUserConnections();
  }, []);

  return {
    showCurrentConnections,
    isLoading,
  };
};

export default useShowConnections;
