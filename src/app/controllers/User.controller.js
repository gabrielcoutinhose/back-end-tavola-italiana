import { v4 } from "uuid";
import User from "../models/User.model";
import * as Yup from "yup";

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean(),
    });
    try {
      await schema.validate(request.body, { abortEarly: false });

      const { name, email, password, admin } = request.body;

      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return response.status(409).json({ error: "User already exists" });
      }

      const user = await User.create({
        id: v4(),
        name,
        email,
        password,
        admin,
      });

      return response
        .status(201)
        .json({ id: user.id, name, email, admin: user.admin || false });
    } catch (err) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new UserController();
