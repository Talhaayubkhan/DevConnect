const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password, skills } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Both first name and last name are required to proceed.");
  } else if (!validator.isEmail(emailId)) {
    throw new Error(
      "The email address provided is invalid. Please enter a valid email (e.g., example@domain.com)."
    );
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Your password must be stronger. Please use a mix of letters, numbers, and symbols."
    );
  } else if (skills.length > 10) {
    throw new Error(
      "You can add up to 10 skills only. Remove extra skills before proceeding."
    );
  }
};

const validateEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "password",
    "age",
    "photoURL",
    "gender",
    "skills",
    "about",
  ];

  const isEditFieldsValid = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditFieldsValid;
};

module.exports = {
  validateSignUpData,
  validateEditData,
};
