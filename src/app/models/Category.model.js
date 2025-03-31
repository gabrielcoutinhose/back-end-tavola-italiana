import Sequelize, { Model } from "sequelize";

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            const baseUrl = process.env.BASE_URL;
            if (!baseUrl) {
              console.warn("⚠️ BASE_URL is not set. Using fallback URL.");
            }
            return `${baseUrl || `http://${process.env.HOST}:${process.env.PORT}`}/category-file/${this.path}`;
          },
        },
      },
      {
        sequelize,
      },
    );
    return this;
  }
}

export default Category;
