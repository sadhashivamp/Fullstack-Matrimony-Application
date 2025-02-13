const express = require("express");
const { updateProfileStep, getUserProfile, getUserProfileStatus, uploadProfilePhoto, uploadGalleryImages, getUserGallery } = require("../controllers/profileController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const multer = require("multer");

const router = express.Router();

// ✅ Multer setup for storing uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // ✅ Save images in `uploads/` folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage });

// ✅ Profile Photo Upload API
router.post("/upload-photo", authMiddleware, upload.single("profilePhoto"), uploadProfilePhoto);
// ✅ Gallery Upload API (Multiple Images)
router.post("/upload-gallery", authMiddleware, upload.array("gallery", 5), uploadGalleryImages);

router.get("/profile/:userId/gallery", authMiddleware, getUserGallery);


router.put("/profile-step", authMiddleware, updateProfileStep);  // ✅ Multi-Step Profile API
router.get("/profile-status", authMiddleware, getUserProfileStatus);  // ✅ Check Profile Completion
router.get("/details", authMiddleware, getUserProfile);  // ✅ Get User Profile

module.exports = router;
