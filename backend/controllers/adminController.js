const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Admin Register (Ensures password is hashed)
const registerAdmin = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check if admin already exists
        let adminExists = await Admin.findOne({ email });
        if (adminExists) return res.status(400).json({ message: "Admin already exists" });

        // Check if phone number already exists
        let phoneExists = await Admin.findOne({ phone });
        if (phoneExists) return res.status(400).json({ message: "Phone number already registered" });

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create admin with hashed password
        const admin = new Admin({ name, email, phone, password: hashedPassword });
        await admin.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Admin Login (Compares hashed password correctly)
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: "Invalid Credentials" });

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        // Generate JWT Token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // ✅ Return Admin Details in Response
        res.json({
            message: "Login Successful",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                phone: admin.phone,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete User (Admin Only)
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        await User.findByIdAndDelete(userId);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


const deleteAdmin = async (req, res) => {
    try {
        const { adminId } = req.params;

        // Ensure the admin exists
        const admin = await Admin.findById(adminId);
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        // Prevent deleting the last admin (optional)
        const adminCount = await Admin.countDocuments();
        if (adminCount <= 1) {
            return res.status(400).json({ message: "At least one admin must remain" });
        }

        // Delete admin
        await Admin.findByIdAndDelete(adminId);
        res.json({ message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const getAllUsers = async (req, res) => {
    try {
        console.log("📡 Admin requested to get all users");

        const users = await User.find().select("id name email gender profilePhoto");

        if (!users.length) {
            console.log("❌ No users found");
            return res.status(404).json({ message: "No users found" });
        }

        // ✅ Categorize users into Male & Female
        const maleUsers = users.filter(user => user.gender === "Male");
        const femaleUsers = users.filter(user => user.gender === "Female");

        res.json({
            totalUsers: users.length,
            maleUsers: maleUsers.length,
            femaleUsers: femaleUsers.length,
            users: {
                male: maleUsers,
                female: femaleUsers
            }
        });

        console.log("✅ Users fetched successfully:", users.length);
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
module.exports = { registerAdmin, loginAdmin, getAllUsers, deleteUser, deleteAdmin };
