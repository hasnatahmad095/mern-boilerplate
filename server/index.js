require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const itemRoutes = require("./routes/items.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Routes
app.use("/api/items", itemRoutes);

// 404 + error handling (must be last)
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
