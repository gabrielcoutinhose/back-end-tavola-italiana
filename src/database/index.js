import Sequelize from "sequelize";
import User from "../app/models/User.model";
import configDatabase from "../config/database";
import Product from "../app/models/Product.model";

const models = [User, Product];

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
