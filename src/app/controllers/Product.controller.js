import * as Yup from "yup";
import Product from "../models/Product.model";

class ProductController {
  // Fix: in error cases; the api is broking; just like the other controllers
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        price: Yup.number().required(),
        category: Yup.string().required(),
      });
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    try {
      const { filename: path } = request.file;
      const { name, price, category } = request.body;

      const product = await Product.create({
        name,
        price,
        category,
        path,
      });
      // Check: if is expose the register data or not
      return response.status(200).json({ ok: true }, { product });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }
  }

  async index(request, response) {
    try {
      const products = await Product.findAll();
      // Check: if is expose the register data or not
      return response.status(200).json({ ok: true }, { products });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }
  }
}

export default new ProductController();
