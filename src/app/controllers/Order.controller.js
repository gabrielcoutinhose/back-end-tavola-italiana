import * as Yup from "yup";
import Product from "../models/Product.model";
import Category from "../models/Category.model";
import Order from "../schemas/Order.schema";
import User from "../models/User.model";

class OrderController {
  async store(request, response) {
    const schema = Yup.object().shape({
      products: Yup.array()
        .required()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          }),
        ),
    });
    try {
      await schema.validate(request.body, { abortEarly: false });

      const productsId = request.body.products.map((product) => product.id);

      const foundProducts = await Product.findAll({
        where: {
          id: productsId,
        },
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["name"],
          },
        ],
      });

      if (foundProducts.length === 0) {
        return response
          .status(404)
          .json({ msg: "No products found for the given IDs" });
      }

      const formatProducts = foundProducts.map((product) => {
        const productIndex = request.body.products.findIndex(
          (requestProduct) => requestProduct.id === product.id,
        );

        if (productIndex === -1) {
          throw new Error(`Product ID ${product.id} not found in request body`);
        }

        const newProduct = {
          id: Number(product.id),
          name: String(product.name),
          price: Number(product.price),
          category: product.category
            ? String(product.category.name)
            : "Uncategorized",
          url: String(product.url),
          quantity: Number(request.body.products[productIndex].quantity),
        };

        return newProduct;
      });

      const order = {
        user: {
          id: String(request.userId),
          name: request.userName,
        },
        products: formatProducts,
        status: "order placed",
      };

      const orderResponse = await Order.create(order);

      return response.status(201).json(orderResponse);
    } catch (err) {
      // console.error("Error on the UserController.store:", err);
      // return response.status(500).json({ error: "Internal server error" });
      return response.status(400).json({ msg: "error", err });
    }
  }

  async index(request, response) {
    try {
      const orders = await Order.find();
      return response.status(200).json(orders);
    } catch (err) {
      // console.error("Error on the UserController.index:", err);
      // return response.status(500).json({ error: "Internal server error" });
      return response.status(400).json({ msg: "error", err });
    }
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      status: Yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ msg: "error", err });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId);

    if (!isAdmin) {
      return response.status(401).json({ error: "User is not an admin" });
    }

    const { id } = request.params;
    const { status } = request.body;

    try {
      await Order.updateOne({ _id: id }, { status });
    } catch (err) {
      return response.status(400).json({ msg: "error", err });
    }

    return response.status(200).json({ msg: "Order updated successfully" });
  }
}

export default new OrderController();
