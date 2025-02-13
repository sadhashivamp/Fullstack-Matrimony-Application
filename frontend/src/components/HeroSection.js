import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles"; // For particle effects
import { loadFull } from "tsparticles";

const HeroSection = ({ t }) => {
    const navigate = useNavigate();

    // Particle Config
    const particlesInit = async (main) => {
        await loadFull(main);
    };

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "white",
            }}
        >
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: "-1",
                }}
            >
                <source src="https://cdn.pixabay.com/video/2023/02/02/146551-799693092_large.mp4" type="video/mp4" />
            </video>

            {/* Overlay Gradient */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg, rgba(30, 58, 138, 0.85) 30%, rgba(255, 64, 129, 0.85) 100%)",
                    zIndex: "0",
                }}
            />

            {/* Particles Effect */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    particles: {
                        number: { value: 50 },
                        size: { value: 3 },
                        move: { enable: true, speed: 1 },
                        opacity: { value: 0.5 },
                        shape: { type: "circle" },
                        color: { value: "#ffffff" },
                    },
                }}
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    zIndex: "0",
                }}
            />

            <Container sx={{ position: "relative", zIndex: "1" }}>
                <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: "bold",
                            mb: 2,
                            textShadow: "2px 2px 10px rgba(255,255,255,0.3)",
                            letterSpacing: "1.5px",
                        }}
                    >
                        {t("findMatch")} ❤️
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 4,
                            fontStyle: "italic",
                            textShadow: "1px 1px 5px rgba(255,255,255,0.3)",
                        }}
                    >
                        {t("securePlatform")}
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
                        {t("getStarted")}
                    </Button>
                </motion.div>
            </Container>
        </Box>
    );
};

export default HeroSection;
