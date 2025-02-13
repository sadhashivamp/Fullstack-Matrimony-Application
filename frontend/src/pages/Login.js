import React, { useState } from "react";
import {
    Box, TextField, Button, Typography, Container, Paper, Divider
} from "@mui/material";
import { Google as GoogleIcon, Facebook as FacebookIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SnackbarComponent from "../components/SnackbarComponent ";

const API_BASE_URL = "https://fullstack-matrimony-application.onrender.com/api";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();

    console.log(error)

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            let emailOrPhone= email;
            const response = await axios.post(`${API_BASE_URL}/user/login`, { emailOrPhone, password });


            console.log('response', response)

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));

                if (response.data.profile?.profileCompleted) {
                    navigate("/dashboard");
                } else {
                    navigate(`/profile-setup?step=${response.data.profile?.lastCompletedStep || 0}`);
                }

                setSnackbarMessage("🚀 Login Successful!");
                setOpenSnackbar(true);
            } else {
                setError("Invalid email or password.");
                setSnackbarMessage("❌ Login Failed!");
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error("Login Error:", error);
            setError("Invalid email or password.");
            setSnackbarMessage("❌ Login Failed!");
            setOpenSnackbar(true);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${API_BASE_URL}/auth/google`;
    };

    const handleFacebookLogin = () => {
        window.location.href = `${API_BASE_URL}/auth/facebook`;
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
                                  url('https://source.unsplash.com/1600x900/?love,romance')`,
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
                        p: 4,
                        borderRadius: 3,
                        textAlign: "center",
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(20px)",
                        boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
                        width: "100%",
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "#fff" }}>
                        Welcome Back! 🚀
                    </Typography>

                    {/* Social Login Buttons */}
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<GoogleIcon />}
                        sx={{
                            mb: 2,
                            backgroundColor: "#DB4437",
                            color: "white",
                            "&:hover": { backgroundColor: "#C1351D" },
                            borderRadius: 50
                        }}
                        onClick={handleGoogleLogin}
                    >
                        Sign in with Google
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<FacebookIcon />}
                        sx={{
                            mb: 2,
                            backgroundColor: "#4267B2",
                            color: "white",
                            "&:hover": { backgroundColor: "#365899" },
                            borderRadius: 50
                        }}
                        onClick={handleFacebookLogin}
                    >
                        Sign in with Facebook
                    </Button>

                    <Divider sx={{ my: 2, color: "white" }}>OR</Divider>

                    {/* Login Form */}
                    <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                borderRadius: 50,
                                py: 1.5,
                                fontSize: "1rem",
                                background: "linear-gradient(135deg, #1e3a8a 30%, #ff4081 100%)"
                            }}
                        >
                            Login
                        </Button>
                    </Box>

                    {/* Register & Reset Links - Now More Highlighted */}
                    <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 1 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{
                                borderRadius: 50,
                                borderColor: "white",
                                color: "white",
                                fontWeight: "bold",
                                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" }
                            }}
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{
                                borderRadius: 50,
                                borderColor: "white",
                                color: "white",
                                fontWeight: "bold",
                                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" }
                            }}
                            onClick={() => navigate("/forgot-password")}
                        >
                            Reset Password
                        </Button>
                    </Box>
                </Paper>
            </Container>

            <SnackbarComponent open={openSnackbar} onClose={() => setOpenSnackbar(false)} message={snackbarMessage} />
        </Box>
    );
};

export default Login;
