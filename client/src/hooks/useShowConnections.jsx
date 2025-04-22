import { toast } from "react-toastify";
import { showConnections } from "../utils/slices/connectionSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_BASE_URL } from "../utils/constant";
import axios from "axios";

const useShowConnections = () => {
  const showCurrentConnections = useSelector((store) => store?.connections);
  const dispatch = useDispatch();

  const fetchCurrentUserConnections = async () => {
    try {
      const response = await axios.get(BACKEND_BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      //     console.log(response?.data?.connectedUsers);

      dispatch(showConnections(response?.data?.connectedUsers));
    } catch (error) {
      console.error("Error fetching connections:", error.message);
      // Handle error (e.g., show a toast notification)
      toast.error("Error fetching connections. Please try again.");
    }
  };

  useEffect(() => {
    fetchCurrentUserConnections();
  }, []);

  return {
    showCurrentConnections,
  };
};

export default useShowConnections;
