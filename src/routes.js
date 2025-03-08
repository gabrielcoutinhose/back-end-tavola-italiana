import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import UserController from "./app/controllers/User.controller";
import SessionController from "./app/controllers/Session.controller";
import ProductController from "./app/controllers/Product.controller";
import authMiddleware from "./app/middlewares/auth.middleware";
import CategoryController from "./app/controllers/Category.controller";
import OrderController from "./app/controllers/Order.controller";

const upload = multer(multerConfig);

const routes = new Router();

routes.post("/users", UserController.store);

routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

// Fix: problem on create; same using the authentication
routes.post("/products", upload.single("file"), ProductController.store);
routes.get("/products", ProductController.index);
routes.put("/products/:id", upload.single("file"), ProductController.update);

routes.post("/categories", upload.single("file"), CategoryController.store);
routes.put("/categories/:id", upload.single("file"), CategoryController.update);
routes.get("/categories", CategoryController.index);

routes.post("/orders", OrderController.store);
routes.put("/orders/:id", OrderController.update);
routes.get("/orders", OrderController.index);

export default routes;
