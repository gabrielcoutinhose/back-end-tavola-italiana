import { Router } from "express";
import UserController from "./app/controllers/User.controller";
import SessionController from "./app/controllers/Session.controller";
import ProductController from "./app/controllers/Product.controller";

const routes = new Router();

routes.post("/users", UserController.store);

routes.post("/sessions", SessionController.store);

routes.post("/products", ProductController.store);

export default routes;
