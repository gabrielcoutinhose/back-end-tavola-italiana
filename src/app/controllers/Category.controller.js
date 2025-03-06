import * as Yup from "yup";
import Category from "../models/Category.model";

class CategoryController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });

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
      // console.error("Error in CategoryController.store: ", err);
      // if (err instanceof Yup.ValidationError) {
      //   return response
      //     .status(400)
      //     .json({ error: "Validation failed", details: err.errors });
      // }
      // if (err.name === "SequelizeUniqueConstraintError") {
      //   return response
      //     .status(400)
      //     .json({ error: "Category name already in use" });
      // }
      // return response.status(500).json({ error: "Internal server error" });
      return response.status(400).json({ msg: "error", err });
    }
  }

  async index(request, response) {
    try {
      const categories = await Category.findAll();

      return response.status(200).json(categories);
    } catch (err) {
      // console.error("Error in CategoryController.index:", err);
      // return response.status(500).json({ error: "Internal server error" });
      if (response.headersSent) {
        console.log("Headers already sent, ignoring...");
        return;
      }
      return response.status(400).json({ msg: "error", err });
    }
  }
}

export default new CategoryController();
