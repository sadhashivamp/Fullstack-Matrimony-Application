import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#1e3a8a" },
        secondary: { main: "#ff4081" },
        background: { default: "#f4f5f9", paper: "#ffffff" },
        text: { primary: "#1e3a8a", secondary: "#555" },
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
        h1: { fontSize: "3rem", fontWeight: "bold" },
        h2: { fontSize: "2.5rem", fontWeight: "bold" },
        h3: { fontSize: "2rem", fontWeight: "bold" },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: "linear-gradient(135deg, #1e3a8a, #ff4081)",
                },
            },
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#ff4081" },
        secondary: { main: "#1e3a8a" },
        background: { default: "#121212", paper: "#1e1e1e" },
        text: { primary: "#ffffff", secondary: "#bbb" },
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
        h1: { fontSize: "3rem", fontWeight: "bold", color: "#fff" },
        h2: { fontSize: "2.5rem", fontWeight: "bold", color: "#fff" },
        h3: { fontSize: "2rem", fontWeight: "bold", color: "#fff" },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: "linear-gradient(135deg, #ff4081, #1e3a8a)",
                },
            },
        },
    },
});
