import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;
const __dirname = path.resolve();

app.use(express.json());

// API routes
app.use("/api/products", productRoutes);

// -------------------- Serve Frontend --------------------
if (process.env.NODE_ENV === "production") {
  console.log("Production mode detected. Serving frontend...");
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}
// ---------------------------------------------------------

const startServer = async () => {
  try {
    connectDB();
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
