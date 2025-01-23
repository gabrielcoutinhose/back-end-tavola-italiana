export default {
  secret: process.env.JWT_SECRET || "my_jwt_secret",
  algorithm: process.env.JWT_ALGORITHM || "HS256",
  expiresIn: process.env.JWT_EXPIRES_IN || "7d",
};
