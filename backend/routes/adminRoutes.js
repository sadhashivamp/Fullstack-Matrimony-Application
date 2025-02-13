const express = require("express");
const { registerAdmin, loginAdmin, getAllUsers, deleteUser, deleteAdmin } = require("../controllers/adminController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerAdmin); // Register Admin (Now with phone)
router.post("/login", loginAdmin); // Login using email or phone

router.get("/admin/get-all-users", authMiddleware, adminMiddleware, getAllUsers);

router.delete("/users/:userId", authMiddleware, adminMiddleware, deleteUser); // Delete User
router.delete("/delete/:adminId", authMiddleware, adminMiddleware, deleteAdmin); // delete admin


module.exports = router;
