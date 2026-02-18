const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");

// 1. GLOBAL CORS - Place this BEFORE any routes
const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// 2. BODY PARSER - Required to read the data you send
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load env vars
try {
  require("dotenv").config();
} catch (e) {
  // dotenv not available, use defaults
}

// Connect to MongoDB
connectDB();

// Create upload directories
const dirs = ["uploads", "uploads/resumes", "uploads/profiles"];
dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Job Portal API is running" });
});

// Root route for Render base URL
app.get("/", (req, res) => {
  res.send("<h2>Welcome to the Job Portal API Backend!<br>API is running.</h2>");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === "MulterError") {
    return res.status(400).json({ message: `Upload error: ${err.message}` });
  }
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/health`);
});
