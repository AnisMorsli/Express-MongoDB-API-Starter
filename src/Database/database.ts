import mongoose, { ConnectOptions } from "mongoose";
import { ConfigDev, ConfigProd } from "../Config/config";

export async function connectDatabase() {
  try {
    if (process.env.NODE_ENV === "production") {
      await mongoose.connect(ConfigProd.DATABASE!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);

      console.log(
        "Connected to Distribution API Database - Initial Connection"
      );
    } else if (process.env.NODE_ENV === "dev") {
      await mongoose.connect(ConfigDev.DATABASE!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);

      console.log(
        "Connected to Distribution API Database - Initial Connection"
      );
    }
  } catch (error: any) {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  }
}
