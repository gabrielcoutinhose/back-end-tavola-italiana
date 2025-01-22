import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import UserController from "./app/controllers/User.controller";
import SessionController from "./app/controllers/Session.controller";
import ProductController from "./app/controllers/Product.controller";

const upload = multer(multerConfig);

const routes = new Router();

routes.post("/users", UserController.store);

routes.post("/sessions", SessionController.store);

routes.post("/products", upload.single("file"), ProductController.store);
routes.get("/products", ProductController.index);

export default routes;
