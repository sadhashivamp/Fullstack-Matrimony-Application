const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
    if (!req.admin) return res.status(403).json({ message: "Access Denied" });
    next();
};


const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization");

        // ✅ Check if token is missing
        if (!token) {
            return res.status(401).json({ message: "No Token Provided, Authorization Denied" });
        }

        // ✅ Ensure correct token format: "Bearer <token>"
        const tokenParts = token.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.status(401).json({ message: "Invalid Token Format" });
        }

        const verified = jwt.verify(tokenParts[1], process.env.JWT_SECRET); // ✅ Verify JWT
        req.user = await User.findById(verified.id).select("-password"); // ✅ Attach user to request

        if (!req.user) {
            return res.status(401).json({ message: "User Not Found" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token", error: error.message });
    }
};


module.exports = { authMiddleware, adminMiddleware };
