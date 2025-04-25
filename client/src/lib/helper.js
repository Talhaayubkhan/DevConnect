import { toast } from "react-toastify";

export const validateInputCredentials = (email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!emailRegex.test(email)) {
    toast.error("Invalid email format");
    return false;
  }

  if (!passwordRegex.test(password)) {
    toast.error(
      "Password must be 8+ chars, include uppercase, lowercase, number, and symbol"
    );
    return false;
  }

  return true;
};
