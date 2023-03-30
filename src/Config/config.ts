import * as dotenv from "dotenv";
dotenv.config();

export const ConfigProd = {
  DATABASE: process.env.MONGO_URI_PRODUCTION,
};

export const ConfigDev = {
  DATABASE: process.env.MONGO_URI_DEV,
  PORT: process.env.PORT_DEV,
};
