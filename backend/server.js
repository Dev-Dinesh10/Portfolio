require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// =====================
// MIDDLEWARE
// =====================

// FIXED CORS: allow frontend on Vercel + local dev
app.use(cors());

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// =====================
// DATABASE (OPTIONAL)
// =====================

// If you want MongoDB, it MUST be a cloud DB (Atlas)
// If you do NOT need DB for contact form, comment this whole block

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) =>
      console.error("MongoDB connection error:", err.message)
    );
} else {
  console.warn("MONGODB_URI not set. Running without database.");
}

// =====================
// ROUTES
// =====================

app.use("/api/contact", contactRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    time: new Date().toISOString(),
  });
});

// =====================
// ERROR HANDLERS
// =====================

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// =====================
// START SERVER
// =====================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
