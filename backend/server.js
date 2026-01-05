import express from "express";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { initDB } from "./db/database.js";

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());                 // allow frontend calls
app.use(express.json());         // parse JSON body

/* ================= INIT DATABASE ================= */
initDB()
  .then(() => console.log("Database initialized"))
  .catch((err) => console.error("DB error:", err));

/* ================= ROUTES ================= */
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("✅ Bulk Order Backend Running");
});

/* ================= START SERVER ================= */
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});