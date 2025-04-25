import { toast } from "react-toastify";

export const validateInputCredentials = (
  firstName,
  lastName,
  email,
  password
) => {
  const nameRegex = /^[a-zA-Zà-žÀ-Ž\s.'-]{2,}$/u;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!firstName && !nameRegex.test(firstName)) {
    toast.error(
      "First name must be at least 2 letters and contain only alphabets"
    );
    return false;
  }

  if (!lastName && !nameRegex.test(lastName)) {
    toast.error(
      "Last name must be at least 2 letters and contain only alphabets"
    );
    return false;
  }

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
