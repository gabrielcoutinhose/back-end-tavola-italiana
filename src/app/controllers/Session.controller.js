import * as Yup from "yup";
import jwt from "jsonwebtoken";
import User from "../models/User.model";
import authConfig from "../../config/auth";

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });

      const { email, password } = request.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return response.status(401).json({ error: "User not found" });
      }

      if (!(await user.checkPassword(password))) {
        return response.status(401).json({ error: "Incorrect password" });
      }

      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        algorithm: authConfig.algorithm,
        expiresIn: authConfig.expiresIn,
      });

      return response.json({
        id: user.id,
        name: user.name,
        email,
        admin: user.admin || false,
        token,
      });
    } catch (err) {
      // console.error("Error in SessionController.store: ", err);
      // if (err instanceof Yup.ValidationError) {
      //   return response
      //     .status(400)
      //     .json({ error: "Validation failed", details: err.errors });
      // }
      // if (err.name === "JsonWebTokenError") {
      //   return response.status(500).json({ error: "Error generating token" });
      // }
      // return response.status(500).json({ error: "Internal server error" });
      return response.status(400).json({ msg: "error", err });
    }
  }
}

export default new SessionController();
