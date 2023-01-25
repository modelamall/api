const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = (password) => bcryptjs.hashSync(password, 10);
const checkPassword = (password, hashedPassword) =>
  bcryptjs.compareSync(password, hashedPassword);
const tokenGenerator = (data, expiresIn = "15h") =>
  jwt.sign(data, process.env.SECRET_KEY, { expiresIn });

const decodeToken = (token) => {
  if (!token) return null;
  return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = {
  hashPassword,
  checkPassword,
  tokenGenerator,
  decodeToken,
};
