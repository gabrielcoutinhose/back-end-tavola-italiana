import app from "./app";

const dotenv = require("dotenv");
require("dotenv-safe").config({
  example: ".env.example",
});

dotenv.config();
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(`Running in ${NODE_ENV} mode`);
  console.log(`Server running on port ${PORT}`);
});
