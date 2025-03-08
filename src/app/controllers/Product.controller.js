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
      offer: Yup.boolean(),
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

      const { name, price, category_id, offer } = request.body;

      const productExists = await Product.findOne({ where: { name } });
      if (productExists) {
        return response.status(400).json({ error: "Product already exists" });
      }

      const product = await Product.create({
        name,
        price,
        category_id,
        path,
        offer,
      });

      return response.status(201).json(product);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return response.status(400).json({ error: err.errors });
      }
      return response.status(500).json({ error: "Internal server error" });
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
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      price: Yup.number().positive(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });

      const { admin: isAdmin } = await User.findByPk(request.userId);

      if (!isAdmin) {
        return response.status(401).json({ error: "User is not an admin" });
      }

      const { id } = request.params;

      const product = await Product.findByPk(id);

      if (!product) {
        return response
          .status(404)
          .json({ error: "Product not found or doesn't exist" });
      }

      const updateData = {
        name: request.body.name,
        price: request.body.price,
        category_id: request.body.category_id,
        offer: request.body.offer,
      };
      if (request.file) {
        updateData.path = request.file.filename;
      }

      await Product.update(updateData, { where: { id } });

      return response.status(200).json();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return response.status(400).json({ error: err.errors });
      }
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new ProductController();
