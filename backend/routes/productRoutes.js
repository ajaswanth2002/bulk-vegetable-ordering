import express from "express";
import { initDB } from "../db/database.js";

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const db = await initDB();
  const products = await db.all("SELECT * FROM products");
  res.json(products);
});

export default router;