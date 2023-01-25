const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = (password) => bcryptjs.hashSync(password, 10);
const checkPassword = (password, hashedPassword) =>
  bcryptjs.compareSync(password, hashedPassword);
const tokenGenerator = (data, expiresIn = "15h") =>
  jwt.sign(data, "f*7A(q/'16g+z1/6w|O<FYo0],HK_'@:qY:Vl#4AVppB1c|XM!k+/okd]((N,8@jaf,uRI+yc8", { expiresIn });

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
