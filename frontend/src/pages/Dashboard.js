import React, { useState, useEffect } from "react";
import {
    AppBar, Toolbar, IconButton, Avatar, Box, Typography, Grid, Modal, Paper, Badge, CircularProgress
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "../components/Footer";
import ProfileSidebar from "../components/ProfileSidebar";
import MatchesSection from "../components/MatchesSection";
import Testimonials from "../components/Testimonials";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [notifications, setNotifications] = useState(3);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/profile/details", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data.profileCompleted) {
                    setUserProfile(res.data.profile);
                    setLoading(false);
                } else {
                    navigate("/profile-setup");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                navigate("/profile-setup");
            }
        };
        fetchUserProfile();
    }, [navigate]);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            background: "linear-gradient(135deg, #1E3A8A, #FF4081)",
        }}>
            {/* AppBar */}
            <AppBar position="fixed" sx={{ background: "rgba(30, 58, 138, 0.8)", backdropFilter: "blur(10px)" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>Matrimony Connect</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <IconButton sx={{ color: "white" }}>
                            <Badge badgeContent={notifications} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton onClick={() => setMobileOpen(!mobileOpen)} sx={{ display: { md: "none" }, color: "white" }}>
                            <MenuIcon />
                        </IconButton>
                        <Avatar
                            src={userProfile?.profilePhoto || "/default-avatar.png"}
                            sx={{
                                width: 45, height: 45, cursor: "pointer",
                                border: "3px solid white", transition: "0.3s",
                                "&:hover": { transform: "scale(1.1)" }
                            }}
                            onClick={() => setProfileModalOpen(true)}
                        />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Profile Modal */}
            <Modal open={profileModalOpen} onClose={() => setProfileModalOpen(false)}>
                <Box sx={{p: 2}}>
                    <IconButton sx={{ position: "absolute", top: 10, right: 10 }} onClick={() => setProfileModalOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                    <ProfileSidebar userProfile={userProfile} />
                </Box>
            </Modal>

            {/* Main Content */}
            <Box sx={{ mt: 10, display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, px: { xs: 2, md: 3 } }}>
                {/* Profile Sidebar (Fixed Left) */}
                <Box sx={{
                    width: { xs: "100%", md: "280px" },
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(15px)",
                    padding: 2,
                    display: { xs: "none", md: "block" }
                }}>
                    <ProfileSidebar userProfile={userProfile} />
                </Box>
                {/* Main Dashboard Content (Scrollable Right Section) */}
                <Box sx={{ flex: 1, overflowY: "auto", px: { xs: 2, md: 4 }, height: "85vh" }}>
                    {loading ? (
                        <CircularProgress color="secondary" sx={{ display: "block", mx: "auto", mt: 5 }} />
                    ) : (
                        <Grid container spacing={3}>
                            <Grid item xs={12}><MatchesSection title="💖 Recommended Matches" userId={userProfile?._id} type="recommended" /></Grid>
                            <Grid item xs={12}><MatchesSection title="📍 Caste-Wise Matches" userId={userProfile?._id} type="caste" /></Grid>
                            <Grid item xs={12}><MatchesSection title="🌍 All Matches" userId={userProfile?._id} type="all" /></Grid>
                            <Grid item xs={12}><Testimonials /></Grid>
                            <Grid item xs={12}><MatchesSection title="🎉 Success Stories" /></Grid>
                        </Grid>
                    )}
                </Box>
            </Box>
            {/* Footer */}
            <Footer />
        </Box>
    );
};

export default Dashboard;
