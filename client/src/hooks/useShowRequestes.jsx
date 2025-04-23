import { useEffect } from "react";
import { toast } from "react-toastify";
import { showRequests } from "../utils/slices/requestSlice";
import { BACKEND_BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const useShowRequests = () => {
  const showFetchRequests = useSelector((store) => store?.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        BACKEND_BASE_URL + "/user/requests/received",
        {
          withCredentials: true,
        }
      );
      // console.log(response?.data?.data);
      dispatch(showRequests(response.data.data));
    } catch (error) {
      console.error("Error fetching requestes:", error);
      toast.error("Error fetching requestes");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    showFetchRequests,
  };
};

export default useShowRequests;
