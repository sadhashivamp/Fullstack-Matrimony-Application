import React from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar, Rating } from "@mui/material";
import { motion } from "framer-motion";

// Dummy Testimonials Data
const testimonialsData = [
    {
        id: 1,
        name: "Amit Verma",
        photo: "https://randomuser.me/api/portraits/men/10.jpg",
        rating: 5,
        feedback: "I found my life partner here! The matchmaking was smooth, and I loved the secure & verified profiles."
    },
    {
        id: 2,
        name: "Sneha Reddy",
        photo: "https://randomuser.me/api/portraits/women/11.jpg",
        rating: 4.5,
        feedback: "Great experience! The app is user-friendly, and I connected with amazing people."
    },
    {
        id: 3,
        name: "Rahul Sharma",
        photo: "https://randomuser.me/api/portraits/men/12.jpg",
        rating: 5,
        feedback: "Highly recommended! The platform ensures privacy and has excellent customer support."
    },
    {
        id: 4,
        name: "Priya Mehta",
        photo: "https://randomuser.me/api/portraits/women/14.jpg",
        rating: 4,
        feedback: "Found a meaningful connection through this app. Safe and reliable!"
    },
];

const Testimonials = () => {
    return (
        <Box
            sx={{
                background: "linear-gradient(135deg, rgba(30, 58, 138, 0.9), rgba(255, 64, 129, 0.9))",
                color: "white",
                p: 5,
                textAlign: "center",
                borderRadius: "12px",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, textTransform: "uppercase", letterSpacing: "1px" }}>
                ❤️ What Our Users Say
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {testimonialsData.map((testimonial, index) => (
                    <Grid item xs={12} sm={6} md={4} key={testimonial.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Card
                                sx={{
                                    borderRadius: "15px",
                                    textAlign: "center",
                                    p: 3,
                                    background: "rgba(255, 255, 255, 0.15)",
                                    backdropFilter: "blur(20px)",
                                    boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.2)",
                                    transition: "0.3s",
                                    "&:hover": { transform: "scale(1.05)" },
                                }}
                            >
                                <Avatar
                                    src={testimonial.photo}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        mx: "auto",
                                        border: "4px solid white",
                                        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
                                        {testimonial.name}
                                    </Typography>
                                    <Rating value={testimonial.rating} precision={0.5} readOnly sx={{ color: "#FFD700" }} />
                                    <Typography variant="body1" sx={{ mt: 2, color: "#f1f1f1", fontStyle: "italic" }}>
                                        "{testimonial.feedback}"
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Testimonials;
