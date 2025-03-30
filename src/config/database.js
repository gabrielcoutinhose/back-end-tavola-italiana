require("dotenv").config();

const postgresConfig = {
  url:
    process.env.DATABASE_URL || "postgres://USER:PASSWORD@HOST:PORT/DATABASE",
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
  uri:
    process.env.MONGO_URI ||
    "mongodb+srv://<user>:<db_password>@cluster0.pfaka3h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  mongooseOptions: {},
};

module.exports = {
  ...postgresConfig,
  postgres: postgresConfig,
  mongo: mongoConfig,
};
