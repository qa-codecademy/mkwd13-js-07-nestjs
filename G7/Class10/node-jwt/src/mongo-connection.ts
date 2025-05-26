import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const mongoConnection = async () => {
  const MONGO_URL = process.env.CONNECTION_URL;

  if (!MONGO_URL) {
    console.warn("MONGO_URL is falsy!!!");
    return;
  }

  try {
    await mongoose.connect(MONGO_URL, {
      dbName: "products-database",
    });
    console.log("Connection to mongo is established.");
  } catch (error) {
    console.error("Mongo connection failed", error);
    throw new Error("Connectioned failed");
  }
};
