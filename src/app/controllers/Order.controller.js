import * as Yup from "yup";
import Product from "../models/Product.model";
import Category from "../models/Category.model";

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

      const order = {
        user: {
          id: request.userId,
          name: request.userName,
        },
      };

      return response.status(201).json(foundProducts);
    } catch (err) {
      // console.error("Error on the UserController.store:", err);
      // return response.status(500).json({ error: "Internal server error" });
      return response.status(400).json({ msg: "error", err });
    }
  }
}

export default new OrderController();
