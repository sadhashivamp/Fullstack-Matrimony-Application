import React, { useState } from "react";
import {
    Container, Box, Typography, Button, Avatar, Grid, Card, CardContent, IconButton, Divider, Chip, Tooltip, Dialog, DialogContent, DialogTitle
} from "@mui/material";
import { Favorite, Message, Call, Visibility, Verified, Report, Lock, Star, PersonAdd, Share, VideoCall, People, Public } from "@mui/icons-material";
import { motion } from "framer-motion";

// Dummy Profile Data
const profileData = {
    name: "Priya Mehta",
    age: 25,
    gender: "Female",
    religion: "Hindu",
    caste: "Rajput",
    motherTongue: "Hindi",
    education: "MBA in Finance",
    occupation: "Investment Banker",
    income: "₹20-30 LPA",
    location: "Mumbai, India",
    about: "I am a fun-loving person who enjoys travel, books, and good food. Looking for someone with a similar mindset.",
    interests: ["Traveling", "Cooking", "Reading", "Dancing"],
    photos: [
        "https://randomuser.me/api/portraits/women/2.jpg",
        "https://source.unsplash.com/200x200/?girl",
        "https://source.unsplash.com/200x200/?smile",
    ],
    family: {
        fatherName: "Ramesh Mehta",
        motherName: "Sunita Mehta",
        siblings: "1 Brother, 1 Sister",
        nativePlace: "Jaipur, Rajasthan",
    },
    lifestyle: {
        diet: "Vegetarian",
        drinking: "Occasionally",
        smoking: "No",
    },
    verified: true,
    verificationLevel: "Premium",
    onlineStatus: "Online",
    horoscopeMatch: "80%",
    matchCompatibility: "92%",
    videoIntro: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    phoneUnlocked: false,
    socialUnlocked: false,
};

const ViewProfile = () => {
    const [openGallery, setOpenGallery] = useState(false);
    const [openVideo, setOpenVideo] = useState(false);
    const [phoneUnlocked, setPhoneUnlocked] = useState(profileData.phoneUnlocked);
    const [socialUnlocked, setSocialUnlocked] = useState(profileData.socialUnlocked);

    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Box
                sx={{
                    background: "linear-gradient(135deg, rgba(30, 58, 138, 0.9), rgba(255, 64, 129, 0.9))",
                    color: "white",
                    p: 3,
                    borderRadius: "15px",
                    textAlign: "center",
                    position: "relative",
                    boxShadow: "0px 5px 15px rgba(0,0,0,0.4)"
                }}
            >
                {/* Profile Photo & Status */}
                <Avatar src={profileData.photos[0]} sx={{ width: 140, height: 140, border: "4px solid white", mx: "auto" }} />
                <Typography variant="h6" sx={{ fontWeight: "bold", color: profileData.onlineStatus === "Online" ? "lime" : "gray" }}>
                    {profileData.onlineStatus}
                </Typography>

                {/* Verified Badge & Trust Level */}
                <Chip
                    icon={<Verified sx={{ color: "#FFD700" }} />}
                    label={`${profileData.verificationLevel} Verified`}
                    sx={{ mt: 1, background: "rgba(255,255,255,0.2)", color: "white" }}
                />

                {/* Name, Age, Location */}
                <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>{profileData.name}, {profileData.age}</Typography>
                <Typography variant="h6" sx={{ color: "#FFD700" }}>{profileData.location}</Typography>

                {/* Match Compatibility */}
                <Typography sx={{ mt: 2 }}>
                    Match Compatibility: <strong>{profileData.matchCompatibility}</strong>
                </Typography>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                    <Tooltip title="Like Profile">
                        <IconButton sx={{ color: "white" }}><Favorite fontSize="large" /></IconButton>
                    </Tooltip>
                    <Tooltip title="Send Message">
                        <IconButton sx={{ color: "white" }}><Message fontSize="large" /></IconButton>
                    </Tooltip>
                    <Tooltip title="Request Video Call">
                        <IconButton sx={{ color: "white" }}><VideoCall fontSize="large" /></IconButton>
                    </Tooltip>
                    <Tooltip title="Share Profile">
                        <IconButton sx={{ color: "white" }}><Share fontSize="large" /></IconButton>
                    </Tooltip>
                </Box>
            </Box>

            {/* Profile Details Section */}
            <Grid container spacing={3} sx={{ mt: 3 }}>
                {/* Left Section */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: "12px", p: 2, background: "rgba(255, 255, 255, 0.9)" }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>About</Typography>
                            <Typography>{profileData.about}</Typography>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Education & Work</Typography>
                            <Typography>{profileData.education} | {profileData.occupation}</Typography>
                            <Typography>Income: {profileData.income}</Typography>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Family Details</Typography>
                            <Typography>Father: {profileData.family.fatherName}</Typography>
                            <Typography>Mother: {profileData.family.motherName}</Typography>
                            <Typography>Siblings: {profileData.family.siblings}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Section */}
                <Grid item xs={12} md={6}>
                    {/* Photos & Video */}
                    <Card sx={{ borderRadius: "12px", p: 2, background: "rgba(255, 255, 255, 0.9)" }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Photos & Videos</Typography>
                            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                                {profileData.photos.map((photo, index) => (
                                    <Avatar key={index} src={photo} sx={{ width: 80, height: 80, cursor: "pointer" }} onClick={() => setOpenGallery(true)} />
                                ))}
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            {/* Request Contact */}
                            <Button
                                variant="contained"
                                startIcon={<Lock />}
                                sx={{ background: "#ff4081", color: "white", fontWeight: "bold", width: "100%" }}
                                onClick={() => setPhoneUnlocked(true)}
                            >
                                {phoneUnlocked ? "Phone: +91 98765 43210" : "Request Phone Number"}
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewProfile;
