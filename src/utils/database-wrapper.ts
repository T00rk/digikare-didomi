import { Sequelize } from "sequelize-typescript";

export const databaseWrapper = new Sequelize({
  dialect: "sqlite",
  storage: "./data/digikare-didomi.db",
  models: [__dirname + "/../models"],
});