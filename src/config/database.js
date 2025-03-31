require("dotenv").config();

const postgresConfig = {
  url: process.env.DATABASE_URL,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

const mongoConfig = {
  uri: process.env.MONGO_URI,
  mongooseOptions: {},
};

module.exports = {
  ...postgresConfig,
  postgres: postgresConfig,
  mongo: mongoConfig,
};
