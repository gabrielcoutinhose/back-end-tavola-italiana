import * as Yup from "yup";
import Product from "../models/Product.model";

class ProductController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required().positive(),
      category: Yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });

      if (!request.file || !request.file.filename) {
        return response.status(400).json({ error: "Image file is required" });
      }
      const { filename: path } = request.file;

      const { name, price, category } = request.body;

      const productExists = await Product.findOne({ where: { name } });
      if (productExists) {
        return response.status(400).json({ error: "Product already exists" });
      }

      const product = await Product.create({
        name,
        price,
        category,
        path,
      });

      return response.status(201).json({
        id: product.id,
        name,
        price,
        category,
        path,
      });
    } catch (err) {
      // console.error("Error on the ProductController.store:", err);
      // if (err instanceof Yup.ValidationError) {
      //   return response
      //     .status(400)
      //     .json({ error: "Validation failed", details: err.errors });
      // }
      // if (err.name === "SequelizeUniqueConstraintError") {
      //   return response
      //     .status(400)
      //     .json({ error: "Product name already in use" });
      // }
      // return response.status(500).json({ error: "Internal server error" });
      return response.status(400).json({ msg: "error", err });
    }
  }

  async index(request, response) {
    try {
      const products = await Product.findAll();
      return response.status(200).json(products);
    } catch (err) {
      // console.error("Error on the ProductController.index:", err);
      // return response.status(500).json({ error: "Internal server error" });
      return response.status(400).json({ msg: "error", err });
    }
  }
}

export default new ProductController();
