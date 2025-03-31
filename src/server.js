import app from "./app";
import dotenv from "dotenv-safe";

dotenv.config();

const { BASE_URL } = process.env;

app.listen(() => {
  console.log(`🚀 Server running in  production mode`);
  console.log(`🌍 Available at: ${BASE_URL}`);
});
