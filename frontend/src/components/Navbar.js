import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItemButton, ListItemText, Box, Menu, MenuItem, Tooltip, ListItemIcon } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TranslateIcon from "@mui/icons-material/Translate";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    // Toggle Mobile Drawer
    const toggleDrawer = () => {
        setMobileOpen(!mobileOpen);
    };

    // Open Language Menu
    const handleLanguageMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Change Language
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky" sx={{
            background: "linear-gradient(135deg, #1e3a8a 30%, #ff4081 100%)",
            py: 1,
            px: 3,
            boxShadow: "0px 5px 15px rgba(0,0,0,0.2)"
        }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                
                {/* Mobile Menu Icon */}
                <IconButton
                    sx={{ display: { xs: "block", md: "none" }, color: "white" }}
                    onClick={toggleDrawer}
                >
                    <MenuIcon />
                </IconButton>

                {/* App Title */}
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",
                        color: "white",
                        cursor: "pointer",
                        transition: "0.3s",
                        "&:hover": { opacity: 0.8 }
                    }}
                    onClick={() => navigate("/")}
                >
                    Matrimony Connect
                </Typography>

                {/* Desktop Buttons */}
                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                    <Button variant="outlined" sx={{
                        color: "white",
                        borderColor: "white",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        transition: "0.3s",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" }
                    }} onClick={() => navigate("/login")}>
                        <LoginIcon sx={{ mr: 1 }} />
                        {t("login")}
                    </Button>

                    <Button variant="contained" sx={{
                        backgroundColor: "white",
                        color: "#1e3a8a",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        px: 3,
                        transition: "0.3s",
                        "&:hover": { backgroundColor: "#e0e0e0" }
                    }} onClick={() => navigate("/register")}>
                        <PersonAddIcon sx={{ mr: 1 }} />
                        {t("register")}
                    </Button>

                    {/* Language Switcher */}
                    <Tooltip title="Change Language">
                        <IconButton onClick={handleLanguageMenuOpen} sx={{ color: "white" }}>
                            <TranslateIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>

            {/* Mobile Drawer */}
            <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
                <Box sx={{
                    width: 280,
                    background: "linear-gradient(135deg, #1e3a8a, #ff4081)",
                    height: "100vh",
                    color: "white",
                    p: 2
                }}>
                    {/* Drawer Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Menu</Typography>
                        <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Drawer List */}
                    <List>
                        <ListItemButton
                            onClick={() => { navigate("/login"); toggleDrawer(); }}
                            sx={{
                                background: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "10px",
                                mb: 2,
                                color: "white",
                                "&:hover": { background: "rgba(255, 255, 255, 0.3)" },
                                transition: "0.3s"
                            }}
                        >
                            <LoginIcon sx={{ mr: 1 }} />
                            <ListItemText primary={t("login")} />
                        </ListItemButton>

                        <ListItemButton
                            onClick={() => { navigate("/register"); toggleDrawer(); }}
                            sx={{
                                background: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "10px",
                                mb: 2,
                                color: "white",
                                "&:hover": { background: "rgba(255, 255, 255, 0.3)" },
                                transition: "0.3s"
                            }}
                        >
                            <PersonAddIcon sx={{ mr: 1 }} />
                            <ListItemText primary={t("register")} />
                        </ListItemButton>

                        <ListItemButton
                            onClick={handleLanguageMenuOpen}
                            sx={{
                                background: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "10px",
                                color: "white",
                                "&:hover": { background: "rgba(255, 255, 255, 0.3)" },
                                transition: "0.3s"
                            }}
                        >
                            <TranslateIcon sx={{ mr: 1 }} />
                            <ListItemText primary="Change Language" />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>

            {/* Language Menu (Same Style for Desktop & Mobile) */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                sx={{
                    "& .MuiPaper-root": {
                        background: "linear-gradient(135deg, #1e3a8a, #ff4081)",
                        color: "white",
                        borderRadius: "12px",
                        boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
                        minWidth: "200px"
                    }
                }}
            >
                {[
                    { code: "en", label: "English", flag: "🇺🇸" },
                    { code: "te", label: "తెలుగు (Telugu)", flag: "🇮🇳" },
                    { code: "hi", label: "हिन्दी (Hindi)", flag: "🇮🇳" }
                ].map((lang) => (
                    <MenuItem
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        sx={{
                            display: "flex",
                            gap: 1.5,
                            alignItems: "center",
                            fontWeight: "bold",
                            "&:hover": { background: "rgba(255,255,255,0.2)" }
                        }}
                    >
                        <ListItemIcon sx={{ color: "white" }}>
                            <LanguageIcon />
                        </ListItemIcon>
                        <ListItemText>{lang.flag} {lang.label}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </AppBar>
    );
};

export default Navbar;
