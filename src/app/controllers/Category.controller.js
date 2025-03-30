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

      if (!request.file || !request.file.filename) {
        return response.status(400).json({ error: "Image file is required" });
      }

      const category = await Category.create({
        name,
        path: request.file.filename,
      });

      return response.status(201).json({
        id: category.id,
        name: category.name,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return response.status(400).json({ error: err.errors });
      }
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async index(request, response) {
    try {
      const categories = await Category.findAll();
      return response.status(200).json(categories);
    } catch {
      if (response.headersSent) {
        console.log("Headers already sent, ignoring...");
        return;
      }
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });

      const { admin: isAdmin } = await User.findByPk(request.userId);

      if (!isAdmin) {
        return response.status(401).json({ error: "User is not an admin" });
      }

      const { name } = request.body;
      const { id } = request.params;

      const category = await Category.findByPk(id);
      console.log(category);

      if (!category) {
        return response
          .status(404)
          .json({ error: "Category not found or doesn't exist" });
      }

      const updateData = { name };
      if (request.file) {
        updateData.path = request.file.filename;
      }

      await Category.update(updateData, { where: { id } });
      return response.status(200).json();
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new CategoryController();
