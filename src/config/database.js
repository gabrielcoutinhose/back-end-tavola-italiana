require("dotenv").config();

module.exports = {
  postgres: {
    username: process.env.POSTGRES_USER || "your_postgres_user",
    password: process.env.POSTGRES_PASSWORD || "your_postgres_password",
    database: process.env.POSTGRES_DB || "psqldb",
    host: process.env.POSTGRES_HOST || "postgres",
    port: process.env.POSTGRES_PORT || "5432",
    dialect: "postgres",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  mongo: {
    username: process.env.MONGO_USER || "your_mongo_user",
    password: process.env.MONGO_PASSWORD || "your_mongo_password",
    database: process.env.MONGO_DB || "your_mongo_db",
    host: process.env.MONGO_HOST || "mongo",
    port: process.env.MONGO_PORT || "27017",
    uri:
      process.env.MONGO_URI ||
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`,
    mongooseOptions: {},
  },
};
