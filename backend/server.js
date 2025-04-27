import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

// Initialize Express app
const app = express();
console.log("NODE_ENV:", process.env.NODE_ENV);

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json()); // allows us to accept json data

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  console.log("Production mode detected. Serving frontend...");
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Connect to DB FIRST, then start the server
const startServer = async () => {
  try {
    connectDB(); // Wait for DB connection
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer(); // Call the async function
