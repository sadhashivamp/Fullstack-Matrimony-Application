import React, { useEffect, useState } from "react";
import {
    Card, CardContent, Typography, Grid, Button, Box, IconButton, CardMedia, TextField, InputAdornment, MenuItem
} from "@mui/material";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

// Dummy Matches Data
const dummyMatches = [
    { _id: "1", name: "Rahul Sharma", age: 28, gender: "Male", caste: "Brahmin", location: "Hyderabad", profilePhoto: "https://randomuser.me/api/portraits/men/1.jpg" },
    { _id: "2", name: "Priya Mehta", age: 25, gender: "Female", caste: "Rajput", location: "Bangalore", profilePhoto: "https://randomuser.me/api/portraits/women/2.jpg" },
    { _id: "3", name: "Amit Verma", age: 30, gender: "Male", caste: "Kayastha", location: "Mumbai", profilePhoto: "https://randomuser.me/api/portraits/men/3.jpg" },
    { _id: "4", name: "Sneha Reddy", age: 26, gender: "Female", caste: "Reddy", location: "Delhi", profilePhoto: "https://randomuser.me/api/portraits/women/4.jpg" },
    { _id: "5", name: "Karan Patel", age: 29, gender: "Male", caste: "Patel", location: "Chennai", profilePhoto: "https://randomuser.me/api/portraits/men/5.jpg" },
];

const MatchesSection = ({ userId, title, type }) => {
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        let data = dummyMatches;
        if (type === "recommended") {
            data = dummyMatches.slice(0, 3);
        } else if (type === "caste") {
            data = dummyMatches.filter((match) => match.caste === "Brahmin");
        } else if (type === "all") {
            data = dummyMatches;
        }

        // Search & Filter logic
        if (searchQuery) {
            data = data.filter(match => match.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (filter !== "All") {
            data = data.filter(match => match.gender === filter);
        }
        setMatches(data);
    }, [type, searchQuery, filter]);

    const handleViewProfile = (profileId) => {
        navigate(`/profile/${profileId}`);
    };

    return (
        <Box
            sx={{
                mt: 3,
                p: 4,
                borderRadius: "15px",
                background: "linear-gradient(135deg, #1e3a8a 30%, #ff4081 100%)",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                color: "white",
                textAlign: "center",
            }}
        >
            {/* Title */}
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, letterSpacing: "1px", textTransform: "uppercase" }}>
                {title}
            </Typography>

            {/* Search & Filter */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
                <TextField
                    variant="outlined"
                    placeholder="Search by Name..."
                    size="small"
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        borderRadius: "8px",
                        input: { color: "white" },
                        width: "60%",
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "white" }} />
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <TextField
                    select
                    variant="outlined"
                    size="small"
                    value={filter}
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        borderRadius: "8px",
                        input: { color: "white" },
                        width: "20%",
                    }}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </TextField>
            </Box>

            {/* Matches Cards */}
            <Grid container spacing={3} justifyContent="center">
                {matches.map((match, index) => (
                    <Grid item xs={12} sm={6} md={4} key={match._id}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Card
                                sx={{
                                    borderRadius: "12px",
                                    background: "rgba(255, 255, 255, 0.9)",
                                    boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                                    transition: "0.3s",
                                    "&:hover": { transform: "scale(1.05)" },
                                }}
                            >
                                {/* Full Rectangular Profile Image */}
                                <CardMedia
                                    component="img"
                                    image={match.profilePhoto}
                                    sx={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "12px 12px 0 0" }}
                                />

                                {/* Profile Info */}
                                <CardContent sx={{ textAlign: "center", p: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "18px", color: "#1e3a8a" }}>
                                        {match.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: "14px", color: "#555" }}>
                                        {match.age} | {match.gender} | {match.location}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: "14px", color: "#555" }}>
                                        {match.caste}
                                    </Typography>
                                </CardContent>

                                {/* Action Buttons */}
                                <Box sx={{ display: "flex", justifyContent: "space-around", p: 2 }}>
                                    <IconButton sx={{ color: "#ff4081" }}>
                                        <FavoriteIcon fontSize="large" />
                                    </IconButton>
                                    <Button
                                        onClick={() => handleViewProfile(match._id)}
                                        variant="contained"
                                        sx={{
                                            borderRadius: "25px",
                                            background: "linear-gradient(135deg, #ff4081 30%, #1e3a8a 100%)",
                                            color: "white",
                                            px: 3,
                                        }}
                                    >
                                        View Profile
                                    </Button>
                                    <IconButton sx={{ color: "#1e3a8a" }}>
                                        <ChatIcon fontSize="large" />
                                    </IconButton>
                                </Box>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MatchesSection;
