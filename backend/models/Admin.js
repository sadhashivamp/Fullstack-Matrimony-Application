const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true }, // Added phone number
    password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
