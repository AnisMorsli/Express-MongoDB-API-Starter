import express, { Request, Response, NextFunction } from "express";
import { connectDatabase } from "./Database/database";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { ConfigDev } from "./Config/config";

dotenv.config();

// Create a new Express application
const app = express();
// Set the port number for the server
const port = process.env.PORT || ConfigDev.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Add middleware to handle cross-origin requests
app.use(cors());

connectDatabase(); // Connect to the database

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// Define a middleware to handle 404 errors
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not found");
  res.status(404).json({
    message: error.message,
  });
});

// Define a middleware to handle all other errors
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  // If the error is a MongoDB error, return a 500 error with a custom message
  if (error instanceof mongoose.Error) {
    res.status(500).json({
      message: "Database error",
    });
  } else {
    // Otherwise, return a 500 error with the error message
    res.status(500).json({
      message: error.message,
    });
  }
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
