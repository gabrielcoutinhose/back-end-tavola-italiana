import jwt from "jsonwebtoken";
import * as Yup from "yup";
import User from "../models/User.model";
import authConfig from "../../config/auth";

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    const userEmailOrPasswordIncorrect = () => {
      return response.status(400).json({ error: "Validation fails" });
    };

    if (!(await schema.isValid(request.body))) userEmailOrPasswordIncorrect();

    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });

    if (!user) userEmailOrPasswordIncorrect();

    if (!(await user.checkPassword(password))) userEmailOrPasswordIncorrect();

    // Check: if is expose the register data or not
    return response.json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        algorithm: authConfig.algorithm,
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
