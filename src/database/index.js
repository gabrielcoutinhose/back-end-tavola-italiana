import Sequelize from "sequelize";
import configDatabase from "../config/database";
import User from "../app/models/User.model";
import Product from "../app/models/Product.model";
import Category from "../app/models/Category";

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(configDatabase);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
