require("dotenv").config();

export default {
  secret: process.env.JWT_SECRET,
  algorithm: process.env.JWT_ALGORITHM,
  expiresIn: process.env.JWT_EXPIRES_IN,
};
