require("dotenv").config();

module.exports = {
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
};
