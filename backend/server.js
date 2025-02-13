require("dotenv").config();
const express = require("express");
const cors = require("cors"); // ✅ Import CORS
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// Middleware
app.use(express.json());

// ✅ Enable CORS
const corsOption = {
    origin: process.env.MONGO_URI,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOption));

 

// Serve Static Files (Images)
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.use("/api/profile", profileRoutes); // ✅ Add Profile Routes

// Start Server
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
