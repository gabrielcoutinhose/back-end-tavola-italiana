import * as Yup from "yup";
import Category from "../models/Product.model";

class CategoryController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    try {
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name } = request.body;

    const category = await Category.create({
      name,
    });

    // Check: if is expose the register data or not
    return response.json(category);
  }

  async index(request, response) {
    const category = await Category.findAll();
    // Check: if is expose the register data or not
    return response.json(category);
  }
}

export default new CategoryController();
