import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.FLOAT,
        path: Sequelize.STRING,
        offer: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            const baseUrl = process.env.BASE_URL;
            if (!baseUrl) {
              console.warn("⚠️ BASE_URL is not set. Using fallback URL.");
            }
            return `${baseUrl || `http://${process.env.HOST}:${process.env.PORT}`}/product-file/${this.path}`;
          },
        },
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
  }
}

export default Product;
