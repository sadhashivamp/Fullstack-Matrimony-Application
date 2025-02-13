import React, { useState } from "react";
import {
    Box, TextField, Button, Typography, Container, Paper, Divider
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../server.js/api";


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !phone || !password || !confirmPassword) {
            setError("❌ All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("❌ Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/api/user/register`, {
                name,
                email,
                phone,
                password
            });

            alert("✅ Registration Successful! Please login.");
            navigate("/login");
        } catch (error) {
            console.error("Registration Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "❌ Registration failed.");
        }
    };


    const handleGoogleSignup = () => {
        window.location.href = `${API_BASE_URL}/auth/google`;
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
                                  url('https://source.unsplash.com/1600x900/?wedding,love')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                top: 0,
                left: 0,
            }}
        >
            <Container maxWidth="xs">
                <Paper
                    elevation={6}
                    sx={{
                        p: 2,
                        borderRadius: 3,
                        textAlign: "center",
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(20px)",
                        boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
                        width: "100%",
                    }}
                >
                    <Typography variant="h5" component='h3' sx={{ fontWeight: "bold", mb: 1, color: "#fff" }}>
                        Create an Account 🚀
                    </Typography>

                    {/* Social Signup Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<GoogleIcon />}
                        sx={{
                            mb: 1,
                            backgroundColor: "#DB4437",
                            color: "white",
                            "&:hover": { backgroundColor: "#C1351D" },
                            borderRadius: 50
                        }}
                        onClick={handleGoogleSignup}
                    >
                        Sign up with Google
                    </Button>

                    <Divider sx={{ my: 2, color: "white" }}>OR</Divider>

                    {/* Registration Form */}
                    <Box component="form" onSubmit={handleRegister} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                        />
                        <TextField
                            label="Phone"
                            variant="outlined"
                            fullWidth
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                borderRadius: 50,
                                py: 1,
                                fontSize: "1rem",
                                background: "linear-gradient(135deg, #1e3a8a 30%, #ff4081 100%)"
                            }}
                        >
                            Register
                        </Button>
                    </Box>

                    {/* Login Link */}
                    <Typography sx={{ mt: 2 }}>
                        Already have an account?{" "}
                        <Button
                            sx={{
                                fontWeight: "bold",
                                color: "white",
                                "&:hover": { textDecoration: "underline" }
                            }}
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default Register;
