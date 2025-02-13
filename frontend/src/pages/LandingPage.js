import React from "react";
import { Box, Typography, Button, Container, Grid, Card, CardContent, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LockIcon from '@mui/icons-material/Lock';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PeopleIcon from '@mui/icons-material/People';
import StarsIcon from '@mui/icons-material/Stars';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SuccessStories from "../components/SuccessStories";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ backgroundColor: "#f4f5f9", minHeight: "100vh" }}>
            <Navbar />

            {/* Hero Section with Floating Elements and Gradient Overlay */}
            <Box
                sx={{
                    backgroundImage: `linear-gradient(135deg, rgba(30, 58, 138, 0.85) 30%, rgba(255, 64, 129, 0.85) 100%), 
                          url('https://t3.ftcdn.net/jpg/06/79/18/48/360_F_679184899_vkb4XBBaKi3yScsH82wQCeKaOMEL25CG.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "0 0 50% 50% / 0 0 20% 20%",
                    py: { xs: 12, md: 16 },
                    textAlign: "center",
                    color: "white",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Floating Abstract Elements */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "10%",
                        left: "10%",
                        width: 100,
                        height: 100,
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "50%",
                        filter: "blur(15px)",
                        animation: "floating 6s infinite ease-in-out",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "5%",
                        right: "10%",
                        width: 150,
                        height: 150,
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        borderRadius: "50%",
                        filter: "blur(20px)",
                        animation: "floating 7s infinite ease-in-out",
                    }}
                />

                <Container maxWidth="lg">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: "bold",
                                mb: 2,
                                textShadow: "2px 2px 10px rgba(255,255,255,0.3)",
                                letterSpacing: "1.5px",
                            }}
                        >
                            Find Your Perfect Match ❤️
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 4,
                                fontStyle: "italic",
                                textShadow: "1px 1px 5px rgba(255,255,255,0.3)",
                            }}
                        >
                            Secure & Trusted Matrimony Platform with Verified Profiles
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/login")}
                            sx={{
                                backgroundColor: "white",
                                color: "#1e3a8a",
                                fontWeight: "bold",
                                px: 4,
                                py: 1.5,
                                borderRadius: "50px",
                                boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.5)",
                                "&:hover": { backgroundColor: "#e3e3e3" },
                            }}
                        >
                            Get Started
                        </Button>
                    </motion.div>
                </Container>
            </Box>


            {/* Features Section with Advanced Glassmorphism */}
            <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        mb: 5,
                        color: "#1e3a8a",
                        textShadow: "2px 2px 8px rgba(0,0,0,0.2)"
                    }}
                >
                    Why Choose Us?
                </Typography>

                <Grid container spacing={4}>
                    {[
                        { title: "Verified & Secure Profiles", icon: <VerifiedUserIcon sx={{ fontSize: 50, color: "#1e3a8a" }} />, bg: "rgba(30, 58, 138, 0.2)" },
                        { title: "AI Matchmaking", icon: <StarsIcon sx={{ fontSize: 50, color: "#e91e63" }} />, bg: "rgba(233, 30, 99, 0.2)" },
                        { title: "User-Friendly Experience", icon: <PeopleIcon sx={{ fontSize: 50, color: "#4caf50" }} />, bg: "rgba(76, 175, 80, 0.2)" },
                        { title: "Privacy & Security", icon: <LockIcon sx={{ fontSize: 50, color: "#ff9800" }} />, bg: "rgba(255, 152, 0, 0.2)" },
                        { title: "24/7 Customer Support", icon: <SupportAgentIcon sx={{ fontSize: 50, color: "#673ab7" }} />, bg: "rgba(103, 58, 183, 0.2)" },
                        { title: "Horoscope Compatibility", icon: <FavoriteIcon sx={{ fontSize: 50, color: "#f44336" }} />, bg: "rgba(244, 67, 54, 0.2)" }
                    ].map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <motion.div
                                whileHover={{ scale: 1.1, boxShadow: "0px 10px 30px rgba(0,0,0,0.3)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card
                                    sx={{
                                        textAlign: "center",
                                        p: 4,
                                        background: "rgba(255, 255, 255, 0.2)",
                                        backdropFilter: "blur(15px)",
                                        borderRadius: "15px",
                                        transition: "0.3s",
                                        border: `2px solid ${feature.bg}`,
                                        boxShadow: "0px 5px 20px rgba(0,0,0,0.1)",
                                        "&:hover": {
                                            background: "rgba(255, 255, 255, 0.3)",
                                            transform: "scale(1.05)",
                                            boxShadow: `0px 10px 30px ${feature.bg}`,
                                        }
                                    }}
                                >
                                    <CardContent>
                                        {feature.icon}
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: "bold",
                                                color: "#1e3a8a",
                                                mt: 2,
                                                textShadow: "1px 1px 5px rgba(0,0,0,0.1)"
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>


            {/* Success Stories Section */}
            <Box sx={{ mt: 10 }}>
                <SuccessStories />
            </Box>

            {/* Call to Action Section */}
            <Box sx={{ mt: 10, textAlign: "center", py: 6, background: "linear-gradient(135deg, #1e3a8a 30%, #ff4081 100%)", color: "white", borderRadius: "50px 50px 0 0" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                    Ready to Begin Your Love Story? 💕
                </Typography>
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Join us today and start your beautiful journey towards marriage!
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/register")}
                    sx={{
                        px: 4,
                        py: 1.5,
                        backgroundColor: "white",
                        color: "#1e3a8a",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        "&:hover": { backgroundColor: "#e0e0e0" }
                    }}
                >
                    Register Now
                </Button>
            </Box>

            <Footer />
        </Box>
    );
};

export default LandingPage;
