const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ User Registration (Hashes Password)
const registerUser = async (req, res) => {
    try {
        const { name, email, phone, gender, password } = req.body;

        // Check if user already exists
        let userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email already registered" });

        let phoneExists = await User.findOne({ phone });
        if (phoneExists) return res.status(400).json({ message: "Phone number already registered" });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User
        const user = new User({ name, email, phone, gender, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ User Login (Compares Hashed Password)
const loginUser = async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;

        // Find user by email or phone
        const user = await User.findOne({
            $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
        });

        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                gender: user.gender
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



module.exports = { registerUser, loginUser };

