import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addUser } from "../app/slices/userSlice";
import { BACKEND_BASE_URL } from "../lib/constant";
import axios from "axios";

const useAuthUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const fetchLoggedInUser = async () => {
    // Avoid unnecessary API call if user is already in Redux store
    if (user) return;

    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/profile/view`, {
        withCredentials: true,
      });

      const userData = response?.data?.data;
      dispatch(addUser(userData));
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      } else {
        toast.error("Something went wrong while fetching user profile.");
        console.error("Profile fetch error:", error);
      }
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);
};

export default useAuthUser;
