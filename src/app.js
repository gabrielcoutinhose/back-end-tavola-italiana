import express from "express";
import routes from "./routes.js";
import path from "path";
import cors from "cors";
import "./database/index.js";

class App {
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(
      "/category-file",
      express.static(path.join(__dirname, "..", "uploads")),
    );
    this.app.use(
      "/product-file",
      express.static(path.join(__dirname, "..", "uploads")),
    );
  }
  routes() {
    this.app.use(routes);
  }
}
export default new App().app;
