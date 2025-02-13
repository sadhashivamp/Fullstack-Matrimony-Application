import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            welcome: "Welcome to Matrimony App",
            findMatch: "Find Your Perfect Match",
            securePlatform: "Secure & Trusted Matrimony Platform with Verified Profiles",
            getStarted: "Get Started",
            login: "Login",
            register: "Register",
            aboutUs: "About Us",
            contact: "Contact",
            language: "Language",
        }
    },
    te: {
        translation: {
            welcome: "మాట్రిమోనీ యాప్‌కి స్వాగతం",
            findMatch: "మీకు సరైన జోడీని కనుగొనండి",
            securePlatform: "సురక్షిత & విశ్వసనీయ మ్యాట్రిమోనీ ప్లాట్‌ఫారమ్ ధృవీకరించబడిన ప్రొఫైల్స్‌తో",
            getStarted: "ప్రారంభించండి",
            login: "ప్రవేశించండి",
            register: "నమోదు",
            aboutUs: "మా గురించి",
            contact: "సంప్రదించండి",
            language: "భాష",
        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem("language") || "en", // Default language
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
