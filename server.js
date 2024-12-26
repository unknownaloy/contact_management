import express from "express";
import dotenv from "dotenv";

import { contactRoutes } from "./routes/contactRoutes.js";

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use("/api/contacts", contactRoutes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
