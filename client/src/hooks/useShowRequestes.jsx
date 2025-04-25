import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { showRequests } from "../app/slices/requestSlice";
import { BACKEND_BASE_URL } from "../lib/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const useShowRequests = () => {
  const showFetchRequests = useSelector((store) => store?.requests);
  const [isRequestsLoading, setIsRequestsLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    setIsRequestsLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/user/requests/received`,
        {
          withCredentials: true,
        }
      );
      // console.log(response?.data?.data);
      dispatch(showRequests(response.data.data));
    } catch (error) {
      console.error("Error fetching requestes:", error);
      toast.error("Error fetching requestes");
    } finally {
      setIsRequestsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    showFetchRequests,
    isRequestsLoading,
  };
};

export default useShowRequests;
