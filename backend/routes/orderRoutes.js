import express from "express";
import { initDB } from "../db/database.js";

const router = express.Router();

/* ================= ADMIN ROUTES FIRST ================= */

// ADMIN: GET ALL ORDERS
router.get("/admin/all", async (req, res) => {
  const db = await initDB();
  const orders = await db.all("SELECT * FROM orders");
  res.json(orders);
});

// ADMIN: UPDATE ORDER STATUS
router.put("/admin/:id", async (req, res) => {
  const { status } = req.body;
  const db = await initDB();

  await db.run(
    "UPDATE orders SET status = ? WHERE id = ?",
    [status, req.params.id]
  );

  res.json({ message: "Order status updated" });
});

/* ================= BUYER ROUTES ================= */

// PLACE ORDER
router.post("/", async (req, res) => {
  const { buyerName, productName, quantity, address } = req.body;

  if (!buyerName || !productName || !quantity || !address) {
    return res.status(400).json({ message: "All fields required" });
  }

  const db = await initDB();

  const result = await db.run(
    `INSERT INTO orders (buyerName, productName, quantity, address)
     VALUES (?, ?, ?, ?)`,
    [buyerName, productName, quantity, address]
  );

  res.json({
    orderId: result.lastID,
    status: "Pending",
  });
});

// TRACK ORDER
router.get("/:id", async (req, res) => {
  const db = await initDB();

  const order = await db.get(
    "SELECT * FROM orders WHERE id = ?",
    req.params.id
  );

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
});

export default router;