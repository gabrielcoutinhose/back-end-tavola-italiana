import Sequelize from "sequelize";
import mongoose from "mongoose";

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

  async init() {
    try {
      const dbUrl = process.env.DATABASE_URL;

      this.connection = new Sequelize(dbUrl, {
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        define: {
          timestamps: true,
          underscored: true,
          underscoredAll: true,
        },
      });

      await this.connection.authenticate();
      console.log("✅ Connection to PostgreSQL established successfully!");

      postgresModels
        .map((model) => model.init(this.connection))
        .map(
          (model) => model.associate && model.associate(this.connection.models),
        );
    } catch (err) {
      console.error("❌ Error connecting to PostgreSQL:", err);
      throw err;
    }
  }

  async mongo() {
    try {
      this.mongoConnection = await mongoose.connect(
        configDatabase.mongo.uri,
        configDatabase.mongo.mongooseOptions,
      );
      console.log("✅ Connection to MongoDB established successfully!");
      mongoModels.forEach((model) => {
        if (model.mongoInit) {
          model.mongoInit(mongoose);
        }
      });
    } catch (err) {
      console.error("❌ Error connecting to MongoDB:", err);
    }
  }
}

export default new Database();
