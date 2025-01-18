import { Router } from "express";
import { v4 } from "uuid";
import User from "./app/models/User";
import { password } from "./config/database";

const routes = new Router();

// Just a example
routes.get("/", async (req, res) => {
  const user = await User.create({
    id: v4(),
    name: "Abraham",
    email: "example@email.com",
    password: password,
  });
  return res.json(user);
});

export default routes;
