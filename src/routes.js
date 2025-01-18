import { Router } from "express";
import UserController from "./app/controllers/User.controller";

const routes = new Router();

routes.post("/users", UserController.store);

export default routes;
