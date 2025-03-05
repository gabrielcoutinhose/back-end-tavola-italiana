import * as Yup from "yup";
import Category from "../models/Category";

class CategoryController {
  // Fix: in error cases; the api is broking; just like the other controllers
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
      });
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    try {
      const { name } = request.body;
      const category = await Category.create({
        name,
      });
      // Check: if is expose the register data or not
      return response.status(200).json({ msg: "ok" }, { category });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }
  }

  async index(request, response) {
    try {
      const categories = await Category.findAll();
      // Check: if is expose the register data or not
      return response.status(200).json({ msg: "ok" }, { categories });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }
  }
}

export default new CategoryController();
