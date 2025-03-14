const adminAuthCheck = (req, res, next) => {
  const token = "xyz";
  const isAuthenticated = token === "xyz";
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).send("Unauthorized Access");
  }
};
const userAuthCheck = (req, res, next) => {
  const token = "xyz";
  const isAuthenticated = token === "xyz";
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).send("Unauthorized Access");
  }
};

module.exports = {
  adminAuthCheck,
  userAuthCheck,
};
