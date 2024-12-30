import express from "express";
import dotenv from "dotenv";

import { contactRoutes } from "./routes/contactRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { connectDb } from "./config/dbConnection.js";

const app = express();
dotenv.config();

const port = process.env.PORT;

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/contacts", contactRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
