import Sequelize from "sequelize";
import { Mongoose } from "mongoose";

import configDatabase from "../config/database";
import User from "../app/models/User.model";
import Product from "../app/models/Product.model";
import Category from "../app/models/Category.model";

const postgresModels = [User, Product, Category];
const mongoModels = [];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(configDatabase.postgres);
    postgresModels
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      );
  }

  mongo() {
    this.mongoConnection = Mongoose.connect(
      configDatabase.mongo.uri,
      configDatabase.mongo.mongooseOptions,
    )
      .then(() => {
        console.log("Connection to MongoDB established successfully!");
        mongoModels.forEach((model) => {
          if (model.mongoInit) {
            model.mongoInit(Mongoose);
          }
        });
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
      });
  }
}

export default new Database();
