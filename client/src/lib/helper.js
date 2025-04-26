import { toast } from "react-toastify";

export const validateInputCredentials = (
  // firstName,
  // lastName,
  email,
  password
  // skills,
  // gender,
  // photoURL
) => {
  // const nameRegex = /^[a-zA-Zà-žÀ-Ž\s.'-]{2,}$/u;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  // const urlRegex =
  //   /^(https?:\/\/)?([\w\-]+\.)+[a-z]{2,6}\/?([\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;

  // if (!firstName && !nameRegex.test(firstName)) {
  //   toast.error(
  //     "First name must be at least 2 letters and contain only alphabets"
  //   );
  //   return false;
  // }

  // if (!lastName && !nameRegex.test(lastName)) {
  //   toast.error(
  //     "Last name must be at least 2 letters and contain only alphabets"
  //   );
  //   return false;
  // }

  if (!email && !emailRegex.test(email)) {
    toast.error("Invalid email format");
    return false;
  }

  if (!password && !passwordRegex.test(password)) {
    toast.error(
      "Password must be 8+ chars, include uppercase, lowercase, number, and symbol"
    );
    return false;
  }

  // if (skills.length > 10) {
  //   toast.error("You can select a maximum of 10 skills.");
  //   return false;
  // }

  // if (
  //   !gender &&
  //   gender !== "male" &&
  //   gender !== "female" &&
  //   gender !== "other"
  // ) {
  //   toast.error("Please select a valid gender.");
  //   return false;
  // }

  // if (!photoURL && !urlRegex.test(photoURL)) {
  //   toast.error("Please provide a valid photo URL.");
  //   return false;
  // }

  return true;
};
