import React, { createContext, useState, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "../theme";

export const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};
