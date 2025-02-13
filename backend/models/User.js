const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profileCompleted: { type: Boolean, default: false } // To check if profile is completed
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
