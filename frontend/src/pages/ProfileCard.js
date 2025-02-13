import React, { useRef, useEffect, useState } from "react";
import {
    Container,
    Box,
    Typography,
    Avatar,
    CardContent,
    Button,
    Paper,
    CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE_URL } from "../server.js/api";

const ProfileCard = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const cardRef = useRef(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${API_BASE_URL}/details`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data.profileCompleted) {
                    setProfile(res.data.profile);
                    setLoading(false);
                } else {
                    navigate("/profile-setup");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                navigate("/profile-setup");
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleDownload = () => {
        html2canvas(cardRef.current, { useCORS: true }).then((canvas) => {
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "Matrimony_Profile_Card.png";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, "image/png");
        });
    };

    /**
     * ✅ Navigate to Dashboard
     */
    const handleGoToDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `linear-gradient(135deg, rgba(30, 58, 138, 0.8) 30%, rgba(255, 64, 129, 0.8) 100%),
                                  url('https://source.unsplash.com/1600x900/?wedding,romantic')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                top: 0,
                left: 0,
            }}
        >
            {loading ? (
                <CircularProgress color="secondary" />
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box ref={cardRef} sx={{
                        position: "relative",
                        width: "320px",
                        textAlign: "center",
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "18px",
                        p: 3,
                        border: "2px solid rgba(255, 255, 255, 0.2)",
                        color: "white",
                        height: "auto"
                    }}>
                        {/* Profile Avatar */}
                        <Avatar
                            src={profile.profilePhoto || "/default-avatar.png"}
                            sx={{
                                width: 140,
                                height: 140,
                                mx: "auto",
                                mt: -7,
                                border: "5px solid white",
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)"
                            }}
                        />

                        <CardContent sx={{ mt: 1 }}>
                            {/* User Name */}
                            <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
                                {profile.name}
                            </Typography>

                            {/* Matrimony ID */}
                            <Paper elevation={3} sx={{
                                display: "inline-block",
                                px: 3,
                                py: 1,
                                mt: 2,
                                borderRadius: 2,
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "14px",
                                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)"
                            }}>
                                Matrimony ID: INFY-{profile._id.slice(-6).toUpperCase()}
                            </Paper>

                            {/* User Details */}
                            <Typography variant="body2" sx={{ mt: 2, fontWeight: "bold", color: "#eee" }}>
                                Age: {profile.age} | Gender: {profile.gender}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, color: "#ddd" }}>
                                {profile.religion} | {profile.caste} | {profile.motherTongue}
                            </Typography>

                            {/* QR Code for Profile */}
                            <Box sx={{ mt: 1, textAlign: "center" }}>
                                <QRCodeCanvas value={`https://matrimony-app.com/profile/${profile._id}`} size={100} />
                                <Typography variant="caption" sx={{ mt: 1, display: "block", color: "#ddd" }}>
                                    Scan to View Profile
                                </Typography>
                            </Box>

                            {/* Action Buttons */}
                            <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                                <Button variant="contained" sx={{
                                    background: "linear-gradient(135deg, #ff6a00, #ff4081)",
                                    color: "white",
                                    fontWeight: "bold",
                                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                                    borderRadius: 5,
                                    py: 1.5
                                }} onClick={handleDownload}>
                                    📥 Download Profile
                                </Button>
                                <Button variant="outlined" sx={{
                                    color: "white",
                                    borderColor: "white",
                                    fontWeight: "bold",
                                    borderRadius: 5,
                                    py: 1.5
                                }} onClick={handleGoToDashboard}>
                                    🚀 Go to Dashboard
                                </Button>
                            </Box>
                        </CardContent>
                    </Box>
                </motion.div>
            )}
        </Box>
    );
};

export default ProfileCard;
