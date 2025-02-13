import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, IconButton, Dialog, DialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { API_BASE_URL } from "../server.js/api";


const SuccessStories = () => {
    const [successStories, setSuccessStories] = useState([]);
    const [openVideo, setOpenVideo] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/landing/success-stories`)
            .then((response) => setSuccessStories(response.data))
            .catch((error) => console.error("Error fetching success stories:", error));
    }, []);

    const handlePlayVideo = (videoUrl) => {
        if (videoUrl) {
            setSelectedVideo(videoUrl);
            setOpenVideo(true);
        } else {
            alert("Video coming soon! 🎥");
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    return (
        <Box
            sx={{
                mt: 10,
                textAlign: "center",
                background: "linear-gradient(135deg, #1e3a8a 30%, #ff4081 100%)",
                color: "white",
                py: 6,
                borderRadius: "50px 50px 0 0",
                overflow: "hidden",
                position: "relative"
            }}
        >
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                    ❤️ Heartwarming Success Stories ❤️
                </Typography>
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Real-life couples who found love through our platform
                </Typography>
            </motion.div>

            {/* Success Stories Slider */}
            {successStories.length > 0 ? (
                <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
                    <Slider {...settings}>
                        {successStories.map((story) => (
                            <motion.div key={story._id} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                                <Card 
                                    onClick={() => navigate(`/success-stories/${story._id}`, { state: { story } })}
                                    sx={{
                                        backgroundColor: "white",
                                        color: "black",
                                        boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                                        mx: 1,
                                        borderRadius: "20px",
                                        overflow: "hidden",
                                        position: "relative",
                                        cursor: "pointer",
                                    }}
                                >
                                    {story.image && (
                                        <CardMedia
                                            component="img"
                                            height="220"
                                            image={`data:image/jpeg;base64,${story.image}`}
                                            alt={story.name}
                                            sx={{ objectFit: "cover", filter: "brightness(0.9)" }}
                                        />
                                    )}

                                    {/* Animated Icons */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 10,
                                            left: 10,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            background: "rgba(255, 255, 255, 0.8)",
                                            borderRadius: "50px",
                                            px: 2,
                                            py: 0.5
                                        }}
                                    >
                                        <VisibilityIcon sx={{ color: "#ff9800" }} />
                                        <Typography variant="caption" sx={{ fontWeight: "bold" }}>Featured Story</Typography>
                                    </Box>

                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1e3a8a", textAlign: "center" }}>
                                            {story.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "#555", mt: 1 }}>
                                            {story.story}
                                        </Typography>

                                        {/* Actions */}
                                        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                                            <IconButton sx={{ color: "#ff4081" }} onClick={(e) => { e.stopPropagation(); alert("Added to Favorites! ❤️") }}>
                                                <FavoriteIcon />
                                            </IconButton>
                                            <IconButton sx={{ color: "#1e3a8a" }} onClick={(e) => { e.stopPropagation(); handlePlayVideo(story.video) }}>
                                                <PlayArrowIcon />
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </Slider>
                </Box>
            ) : (
                <Typography variant="body1" sx={{ fontSize: "18px", fontWeight: "bold" }}>No success stories available.</Typography>
            )}

            {/* Video Modal */}
            <Dialog open={openVideo} onClose={() => setOpenVideo(false)} maxWidth="md" fullWidth>
                <DialogContent sx={{ p: 2, textAlign: "center", background: "black" }}>
                    <IconButton sx={{ position: "absolute", top: 10, right: 10, color: "white" }} onClick={() => setOpenVideo(false)}>
                        <CloseIcon />
                    </IconButton>
                    {selectedVideo ? (
                        <iframe
                            width="100%"
                            height="400px"
                            src={selectedVideo}
                            title="Success Story Video"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <Typography variant="h6" color="white">No Video Available</Typography>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default SuccessStories;
