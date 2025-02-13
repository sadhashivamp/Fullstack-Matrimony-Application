const Profile = require("../models/Profile");
const User = require("../models/User");
const fs = require("fs");




const updateProfileStep = async (req, res) => {
    try {
        const userId = req.user.id;
        const { step, formData } = req.body;

        console.log(`🔹 Step ${step} received for user: ${userId}`);
        console.log("🔹 Received Data:", formData);

        // ✅ Check if formData is empty or undefined
        if (!formData || Object.keys(formData).length === 0) {
            return res.status(400).json({ message: "Invalid request: formData is missing" });
        }

        // ✅ Ensure profile exists or create a new one
        let profile = await Profile.findOne({ userId });

        if (!profile) {
            console.log("🔹 Creating new profile");
            profile = new Profile({ userId, lastCompletedStep: step, ...formData });
        } else {
            console.log("🔹 Updating existing profile");

            // ✅ Update only provided fields, prevent overwriting
            Object.keys(formData).forEach((key) => {
                if (formData[key] !== undefined && formData[key] !== null) {
                    profile[key] = formData[key];
                }
            });

            profile.lastCompletedStep = step;
        }

        // ✅ Mark profile as complete on last step
        if (step === 7) {
            await User.findByIdAndUpdate(userId, { profileCompleted: true });
        }

        await profile.save();
        console.log("✅ Profile updated successfully");

        res.json({
            message: `Step ${step} completed successfully`,
            lastCompletedStep: profile.lastCompletedStep,
            profileCompleted: step === 7
        });
    } catch (error) {
        console.error("❌ Profile update error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


const getUserProfileStatus = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find user profile status
        const user = await User.findById(userId).select("profileCompleted");
        const profile = await Profile.findOne({ userId }).select("lastCompletedStep");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            profileCompleted: user.profileCompleted,
            lastCompletedStep: profile ? profile.lastCompletedStep : 0
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const BASE_URL = process.env.BASE_URL || "https://fullstack-matrimony-application.onrender.com"; // ✅ Fallback if env fails

        const user = await User.findById(userId).select("name email profileCompleted");
        if (!user) return res.status(404).json({ message: "User not found" });

        const profile = await Profile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({ message: "Profile not found, please complete your profile" });
        }

        // ✅ Ensure `profilePhoto` is a full URL
        const fullImageUrl = profile.profilePhoto ? `${BASE_URL}${profile.profilePhoto}` : "";

        res.json({
            profileCompleted: user.profileCompleted,
            profile: {
                id: profile._id,
                name: user.name,
                email: user.email,
                age: profile.age,
                gender: profile.gender,
                dob: profile.dob,
                profilePhoto: fullImageUrl, // ✅ Now it has the correct URL
                gallery: profile.gallery.map(img => `${BASE_URL}${img}`)
            }
        });
    } catch (error) {
        console.error("❌ Error fetching profile:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



const uploadProfilePhoto = async (req, res) => {
    try {
        const userId = req.user.id;

        // ✅ Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const imagePath = `/uploads/${req.file.filename}`;

        // ✅ Update user's profile with the new image
        const profile = await Profile.findOneAndUpdate(
            { userId },
            { profilePhoto: imagePath },
            { new: true }
        );

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json({ message: "Profile photo uploaded successfully", profilePhoto: imagePath });
    } catch (error) {
        console.error("❌ Profile Photo Upload Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


const uploadGalleryImages = async (req, res) => {
    try {
        const userId = req.user.id;
        const BASE_URL = process.env.BASE_URL || "https://fullstack-matrimony-application.onrender.com"; // ✅ Ensure correct base URL

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        // ✅ Convert file paths to full URLs
        const imagePaths = req.files.map((file) => `${BASE_URL}/uploads/${file.filename}`);

        console.log("✅ Uploaded Images:", imagePaths);

        // ✅ Update profile's gallery
        const profile = await Profile.findOneAndUpdate(
            { userId },
            { $push: { gallery: { $each: imagePaths } } }, // Append new images
            { new: true }
        );

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json({
            message: "Gallery images uploaded successfully",
            gallery: profile.gallery
        });
    } catch (error) {
        console.error("❌ Gallery Upload Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


const getUserGallery = async (req, res) => {
    try {
        const { userId } = req.params;
        const BASE_URL = process.env.BASE_URL || "https://fullstack-matrimony-application.onrender.com";

        console.log(`📡 Fetching gallery for user: ${userId}`);

        // ✅ Check if user exists
        const userExists = await User.findById(userId);
        if (!userExists) {
            console.log("❌ User Not Found in MongoDB:", userId);
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Find the user's profile
        const profile = await Profile.findOne({ userId });

        if (!profile) {
            console.log("❌ Profile Not Found for User:", userId);
            return res.status(404).json({ message: "Profile not found" });
        }

        // ✅ Convert stored image paths into full URLs
        const galleryUrls = profile.gallery.map(img => img.startsWith("http") ? img : `${BASE_URL}${img}`);

        console.log("✅ Fetched Gallery URLs:", galleryUrls);
        res.json({ gallery: galleryUrls });
    } catch (error) {
        console.error("❌ Error fetching gallery:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


module.exports = { updateProfileStep, getUserProfileStatus, getUserProfile, uploadProfilePhoto, uploadGalleryImages, getUserGallery };
