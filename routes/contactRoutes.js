import { Router } from "express";
import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
} from "../controllers/contactController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

export const contactRoutes = new Router();

contactRoutes.use(validateToken);

contactRoutes.get("/", getContacts);

contactRoutes.post("/", createContact);

contactRoutes.get("/:id", getContact);

contactRoutes.put("/:id", updateContact);

contactRoutes.delete("/:id", deleteContact);
