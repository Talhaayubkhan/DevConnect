const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password, skills, photoURL } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Both first name and last name are required to proceed.");
  } else if (!validator.isEmail(emailId)) {
    throw new Error(
      "The email address provided is invalid. Please enter a valid email (e.g., example@domain.com)."
    );
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Your password must be stronger. Ensure it has at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character."
    );
  } else if (!validator.isURL(photoURL)) {
    throw new Error(
      "The photo URL provided is not valid. Please provide a proper image link."
    );
  } else if (skills.length > 10) {
    throw new Error(
      "You can add up to 10 skills only. Remove extra skills before proceeding."
    );
  }
};

module.exports = {
  validateSignUpData,
};
