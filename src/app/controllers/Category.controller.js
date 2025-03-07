import * as Yup from "yup";
import Category from "../models/Category.model";
import User from "../models/User.model";

class CategoryController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });

      const { admin: isAdmin } = await User.findByPk(request.userId);

      if (!isAdmin) {
        return response.status(401).json({ error: "User is not an admin" });
      }

      const { name } = request.body;

      const categoryExists = await Category.findOne({ where: { name } });
      if (categoryExists) {
        return response.status(400).json({ error: "Category already exists" });
      }

      const category = await Category.create({ name });

      return response.status(201).json({
        id: category.id,
        name: category.name,
      });
    } catch (err) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async index(request, response) {
    try {
      const categories = await Category.findAll();

      return response.status(200).json(categories);
    } catch (err) {
      if (response.headersSent) {
        console.log("Headers already sent, ignoring...");
        return;
      }
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new CategoryController();
