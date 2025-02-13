import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Avatar, Typography, Button, Box, CircularProgress, IconButton, Grid, Card, CardMedia, CardActions,
    Tooltip, Dialog, DialogContent
} from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api/profile"; // ✅ Base API URL

const ProfileSidebar = ({ userProfile }) => {
    const [imageGallery, setImageGallery] = useState([]);
    const [loadingImages, setLoadingImages] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    // ✅ Fetch User's Gallery Images when Profile Loads
    useEffect(() => {
        if (userProfile && userProfile.id) { // ✅ Changed _id to id
            fetchUserImages(userProfile.id);
        }
    }, [userProfile]);

    // ✅ Fetch User's Gallery Images
    const fetchUserImages = async (userId) => {
        try {
            setLoadingImages(true);
            const token = localStorage.getItem("token");
            console.log(`📡 Fetching gallery for user: ${userId}`);

            const response = await axios.get(`${API_BASE_URL}/${userId}/gallery`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            console.log("✅ Fetched Gallery:", response.data.gallery);
            setImageGallery(response.data.gallery);
        } catch (error) {
            console.error("❌ Error fetching images:", error.response?.data || error);
        } finally {
            setLoadingImages(false);
        }
    };

    // ✅ Handle Image Upload
    const handleImageUpload = async (event) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        if (!userProfile || !userProfile.id) { // ✅ Changed _id to id
            console.error("❌ User ID missing, cannot upload images!");
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("gallery", files[i]);
        }
        formData.append("userId", userProfile.id); // ✅ Ensure correct userId is sent

        try {
            const token = localStorage.getItem("token");
            console.log("📡 Sending Image Upload Request...");

            const response = await axios.post(
                `${API_BASE_URL}/upload-gallery`,
                formData,
                { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
            );

            console.log("✅ Image Upload Response:", response.data);

            if (response.data.gallery) {
                setImageGallery((prevGallery) => [...prevGallery, ...response.data.gallery]);
            }
        } catch (error) {
            console.error("❌ Error uploading images:", error.response?.data || error);
        }
    };

    // ✅ Handle Image Deletion
    const handleDeleteImage = async (imageUrl) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API_BASE_URL}/delete-image`, {
                headers: { "Authorization": `Bearer ${token}` },
                data: { imageUrl }
            });

            setImageGallery((prevGallery) => prevGallery.filter(img => img !== imageUrl));
        } catch (error) {
            console.error("❌ Error deleting image:", error.response?.data || error);
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: { xs: 'auto', lg: '100vh' },
                background: "linear-gradient(135deg, rgba(30, 58, 138, 0.9), rgba(255, 64, 129, 0.9))",
                color: "white",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 3,
                borderRadius: "20px",
                boxShadow: "0px 5px 20px rgba(0,0,0,0.2)",
                backdropFilter: "blur(10px)",
                transition: "0.3s",
            }}
        >
            {/* Profile Avatar */}
            <Avatar
                src={userProfile?.profilePhoto || "/default-avatar.png"}
                sx={{
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    border: "5px solid white",
                    boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.4)",
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.08)" },
                }}
            />

            <Typography variant="h5" fontWeight={700} sx={{ fontSize: "22px", mt: 1 }}>
                {userProfile?.name || "User Name"}
            </Typography>
            <Typography variant="body1">Age: {userProfile?.age} | {userProfile?.gender}</Typography>
            <Typography variant="body1">Location: {userProfile?.native || "Unknown"}</Typography>

            {/* Edit Profile Button */}
            <Button
                variant="contained"
                sx={{
                    mt: 3,
                    width: "90%",
                    borderRadius: "50px",
                    background: "linear-gradient(135deg, #ff4081, #1e3a8a)",
                    fontSize: "16px",
                    fontWeight: "bold",
                    boxShadow: "0px 5px 15px rgba(255, 64, 129, 0.5)",
                    "&:hover": { background: "linear-gradient(135deg, #ff006a, #1b3a8a)" },
                }}
                onClick={() => navigate("/profile-setup")}
            >
                Edit Profile
            </Button>

            {/* Gallery Section */}
            <Box sx={{ mt: 4, width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" fontWeight={600}>My Gallery</Typography>

                    {/* Upload Image */}
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: "none" }} id="upload-image" />
                    <label htmlFor="upload-image">
                        <Tooltip title="Upload Image">
                            <IconButton sx={{ background: "rgba(255, 255, 255, 0.3)", p: 1.5, borderRadius: "8px", "&:hover": { background: "rgba(255, 255, 255, 0.5)", transform: "scale(1.1)" }, transition: "0.3s" }} component="span">
                                <AddPhotoAlternateIcon sx={{ fontSize: 28, color: "white" }} />
                            </IconButton>
                        </Tooltip>
                    </label>
                </Box>

                {/* Display Gallery Images */}
                <Grid container spacing={1} justifyContent="center">
                    {loadingImages ? (
                        <CircularProgress size={24} />
                    ) : imageGallery?.length > 0 ? (
                        imageGallery.map((image, index) => (
                            <Grid item key={index}>
                                <Card>
                                    <CardMedia component="img" image={`http://localhost:5000${image}`} sx={{ height: 100 }} />
                                    <CardActions>
                                        <IconButton onClick={() => handleDeleteImage(image)}>
                                            <DeleteIcon sx={{ color: "red" }} />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography>No images uploaded yet</Typography>
                    )}
                </Grid>
            </Box>
        </Box>
    );
};

export default ProfileSidebar;
