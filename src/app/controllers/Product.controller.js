import * as Yup from "yup";
import Product from "../models/Product.model";
import Category from "../models/Category.model";
import User from "../models/User.model";

class ProductController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required().positive(),
      category_id: Yup.number().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });

      const { admin: isAdmin } = await User.findByPk(request.userId);

      if (!isAdmin) {
        return response.status(401).json({ error: "User is not an admin" });
      }

      if (!request.file || !request.file.filename) {
        return response.status(400).json({ error: "Image file is required" });
      }
      const { filename: path } = request.file;

      const { name, price, category_id } = request.body;

      const productExists = await Product.findOne({ where: { name } });
      if (productExists) {
        return response.status(400).json({ error: "Product already exists" });
      }

      const product = await Product.create({
        name,
        price,
        category_id,
        path,
      });

      return response.status(201).json({
        id: product.id,
        name,
        price,
        category_id,
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
      const products = await Product.findAll({
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name"],
          },
        ],
      });
      return response.status(200).json(products);
    } catch (err) {
      // console.error("Error on the ProductController.index:", err);
      // return response.status(500).json({ error: "Internal server error" });
      return response.status(400).json({ msg: "error", err });
    }
  }
}

export default new ProductController();
