import app from "./app";
import dotenv from "dotenv-safe";

dotenv.config();

const { BASE_URL, PORT, HOST, NODE_ENV } = process.env;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${NODE_ENV} mode`);
  console.log(`🌍 Available at: ${BASE_URL || `http://${HOST}:${PORT}`}`);
});
