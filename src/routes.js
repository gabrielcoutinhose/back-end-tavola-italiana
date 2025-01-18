import { Router } from "express";
import UserController from "./app/controllers/User.controller";
import SessionController from "./app/controllers/Session.controller";

const routes = new Router();

routes.post("/users", UserController.store);

routes.post("/users/sessions", SessionController.store);

export default routes;
