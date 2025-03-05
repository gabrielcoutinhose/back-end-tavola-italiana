import { v4 } from "uuid";
import User from "../models/User.model";
import * as Yup from "yup";

class UserController {
  // Fix: in error cases; the api is broking; just like the other controllers
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
        admin: Yup.boolean(),
      });
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    try {
      const { name, email, password, admin } = request.body;

      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return response.status(400).json({ error: "User already exists" });
      }

      const user = await User.create({
        id: v4(),
        name,
        email,
        password,
        admin,
      });

      // Check: if is expose the register data or not
      return response.status(201).json({ id: user.id, name, email, admin });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }
  }
}

export default new UserController();
