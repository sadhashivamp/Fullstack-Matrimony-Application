import React, { useState } from "react";
import { Menu, MenuItem, ListItemIcon, Typography, Box, IconButton, Button, Tooltip } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import LanguageIcon from "@mui/icons-material/Language";

const LanguageSwitcher = ({ changeLanguage, handleLanguageMenuOpen }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            {/* Language Toggle Button */}
            <Tooltip title="Change Language" arrow>
                <Button
                    onClick={handleMenuOpen}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius: "25px",
                        background: "linear-gradient(135deg, #ff4081, #1e3a8a)",
                        color: "white",
                        fontWeight: "bold",
                        textTransform: "none",
                        "&:hover": { background: "linear-gradient(135deg, #1e3a8a, #ff4081)" }
                    }}
                >
                    <TranslateIcon sx={{ fontSize: 22 }} />
                    <Typography variant="body1" sx={{ fontSize: "14px" }}>
                        Language
                    </Typography>
                </Button>
            </Tooltip>

            {/* Language Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{
                    "& .MuiPaper-root": {
                        background: "linear-gradient(135deg, #1e3a8a, #ff4081)",
                        color: "white",
                        borderRadius: "12px",
                        boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
                        minWidth: "180px"
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
                        onClick={() => {
                            changeLanguage(lang.code);
                            handleMenuClose();
                        }}
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
                        <Typography variant="body1">{lang.flag} {lang.label}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default LanguageSwitcher;
