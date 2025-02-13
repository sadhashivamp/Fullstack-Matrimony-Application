import React, { useState, useEffect } from "react";
import {
    Box, TextField, Button, Typography, Container, Avatar, MenuItem, Paper, IconButton, LinearProgress
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { API_BASE_URL } from "../server.js/api";


const steps = ["Basic Info", "Personal Details", "Education & Work", "Lifestyle", "Family", "Partner Preferences", "Upload Photo"];

const ProfileSetup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "", age: "", gender: "", dob: "", bio: "", religion: "", caste: "", motherTongue: "",
        education: "", occupation: "", income: "", height: "", weight: "",
        diet: "", drinking: "", smoking: "",
        fatherName: "", motherName: "", siblings: "", native: "",
        preferredAge: "", preferredHeight: "", preferredLocation: "",
        profilePhoto: null, gallery: []
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [activeStep, setActiveStep] = useState(0);

    const loading = false;

    useEffect(() => {
        const fetchUserProgress = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${API_BASE_URL}/profile-status`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const { profileCompleted, lastCompletedStep } = res.data;

                if (profileCompleted) {
                    navigate("/dashboard");
                } else {
                    setActiveStep(lastCompletedStep || 0);
                }
            } catch (error) {
                console.error("Error fetching user progress:", error);
            }
        };

        fetchUserProgress();
    }, [navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // ✅ Hide error message when user starts editing
        if (errorMessage) {
            setErrorMessage("");
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append("profilePhoto", file);

            try {
                const token = localStorage.getItem("token");
                const res = await fetch("https://fullstack-matrimony-application.onrender.com/api/profile/upload-photo", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData
                });

                const data = await res.json();
                console.log("✅ Uploaded Photo URL:", data.profilePhoto);

                setFormData((prev) => ({ ...prev, profilePhoto: data.profilePhoto }));
            } catch (error) {
                console.error("❌ Image Upload Error:", error);
            }
        } else {
            console.error("❌ No file selected.");
        }
    };


    const validateStep = () => {
        switch (activeStep) {
            case 0:
                if (!formData.name || !formData.age || !formData.gender || !formData.dob) {
                    return { isValid: false, message: "Please fill all fields in 'Basic Information'." };
                }
                break;
            case 1:
                if (!formData.bio || !formData.religion || !formData.caste || !formData.motherTongue) {
                    return { isValid: false, message: "Please complete 'Personal Details' before proceeding." };
                }
                break;
            case 2:
                if (!formData.education || !formData.occupation || !formData.income || !formData.height || !formData.weight) {
                    return { isValid: false, message: "Please provide 'Education & Work' details." };
                }
                break;
            case 3:
                if (!formData.diet || !formData.drinking || !formData.smoking) {
                    return { isValid: false, message: "Fill in all 'Lifestyle' preferences." };
                }
                break;
            case 4:
                if (!formData.fatherName || !formData.motherName || !formData.siblings || !formData.native) {
                    return { isValid: false, message: "Please enter 'Family Details'." };
                }
                break;
            case 5:
                if (!formData.preferredAge || !formData.preferredHeight || !formData.preferredLocation) {
                    return { isValid: false, message: "Complete 'Partner Preferences'." };
                }
                break;
            case 6:
                if (!formData.profilePhoto) {
                    return { isValid: false, message: "Please upload a profile photo before submitting." };
                }
                break;
            default:
                return { isValid: false, message: "Unknown step validation error." };
        }
        return { isValid: true, message: "" }; // ✅ Return valid if all fields are filled
    };

    const handleNext = async () => {
        const validation = validateStep();
        if (!validation.isValid) {
            setErrorMessage(validation.message); // ✅ Show error message
            return;
        }

        setErrorMessage(""); //
        const token = localStorage.getItem("token");

        try {
            console.log("🔹 Sending FormData:", formData); // ✅ Log formData before sending

            const res = await fetch("https://fullstack-matrimony-application.onrender.com/api/profile/profile-step", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    step: activeStep + 1,
                    formData
                })
            });

            const data = await res.json();
            console.log("✅ API Response:", data);

            if (data.profileCompleted) {
                navigate("/dashboard");
            } else {
                setActiveStep((prev) => prev + 1);
            }
        } catch (error) {
            console.error("❌ API Error:", error);
        }
    };

    const handleSubmit = async () => {
        await handleNext();  // ✅ Call handleNext to submit last step
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };


    const renderStepContent = (step) => (
        <Paper
            elevation={6}
            sx={{
                p: 4, borderRadius: "15px", background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(15px)", boxShadow: "0px 5px 20px rgba(0,0,0,0.2)", width: "100%"
            }}
        >

            {errorMessage && (
                <Box sx={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", width: "80%", zIndex: 1000 }}>
                    <Alert severity="error" sx={{ mb: 2, textAlign: "center" }}>
                        {errorMessage}
                    </Alert>
                </Box>
            )}

            {/* Step 1: Basic Information */}
            {step === 0 && (
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1e3a8a", mb: 2 }}>Basic Information</Typography>
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Full Name" name="name" fullWidth value={formData.name} onChange={handleChange} margin="normal" />
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Age" name="age" type="number" fullWidth value={formData.age} onChange={handleChange} margin="normal" />
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} select label="Gender" name="gender" fullWidth value={formData.gender} onChange={handleChange} margin="normal">
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Date of Birth" type="date" name="dob" fullWidth value={formData.dob} onChange={handleChange} margin="normal" InputLabelProps={{ shrink: true }} />
                </Box>
            )}

            {/* Step 2: Personal Details */}
            {step === 1 && (
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1e3a8a", mb: 2 }}>Personal Details</Typography>
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Bio" name="bio" fullWidth multiline rows={3} value={formData.bio} onChange={handleChange} margin="normal" />
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Religion" name="religion" fullWidth value={formData.religion} onChange={handleChange} margin="normal" />
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Caste" name="caste" fullWidth value={formData.caste} onChange={handleChange} margin="normal" />
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Mother Tongue" name="motherTongue" fullWidth value={formData.motherTongue} onChange={handleChange} margin="normal" />
                </Box>
            )}

            {/* Step 3: Education & Work */}
            {step === 2 && (
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1e3a8a", mb: 2 }}>Education & Work</Typography>
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Education" name="education" fullWidth value={formData.education} onChange={handleChange} margin="normal" />
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Occupation" name="occupation" fullWidth value={formData.occupation} onChange={handleChange} margin="normal" />
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Income" name="income" fullWidth value={formData.income} onChange={handleChange} margin="normal" />
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Height (in cm)" name="height" type="number" fullWidth value={formData.height} onChange={handleChange} margin="normal" />
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Weight (in kg)" name="weight" type="number" fullWidth value={formData.weight} onChange={handleChange} margin="normal" />
                </Box>
            )}

            {/* Step 4: Lifestyle */}
            {step === 3 && (
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1e3a8a", mb: 2 }}>Lifestyle</Typography>
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} select label="Diet" name="diet" fullWidth value={formData.diet} onChange={handleChange} margin="normal">
                        <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                        <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                        <MenuItem value="Eggetarian">Eggetarian</MenuItem>
                    </TextField>
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} select label="Drinking" name="drinking" fullWidth value={formData.drinking} onChange={handleChange} margin="normal">
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="Occasionally">Occasionally</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                    </TextField>
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} select label="Smoking" name="smoking" fullWidth value={formData.smoking} onChange={handleChange} margin="normal">
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="Occasionally">Occasionally</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                    </TextField>
                </Box>
            )}

            {/* Step 5: Family Details */}
            {step === 4 && (
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1e3a8a", mb: 2 }}>Family Details</Typography>
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Father's Name" name="fatherName" fullWidth value={formData.fatherName} onChange={handleChange} margin="normal" />
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Mother's Name" name="motherName" fullWidth value={formData.motherName} onChange={handleChange} margin="normal" />
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Siblings" name="siblings" type="number" fullWidth value={formData.siblings} onChange={handleChange} margin="normal" />
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Native Place" name="native" fullWidth value={formData.native} onChange={handleChange} margin="normal" />
                </Box>
            )}

            {/* Step 6: Partner Preferences */}
            {step === 5 && (
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1e3a8a", mb: 2 }}>Partner Preferences</Typography>
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Preferred Age" name="preferredAge" fullWidth value={formData.preferredAge} onChange={handleChange} margin="normal" />
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Preferred Height" name="preferredHeight" fullWidth value={formData.preferredHeight} onChange={handleChange} margin="normal" />
                    <TextField sx={{ backgroundColor: "white", borderRadius: "8px" }} label="Preferred Location" name="preferredLocation" fullWidth value={formData.preferredLocation} onChange={handleChange} margin="normal" />
                </Box>
            )}

            {/* Step 7: Upload Profile Photo */}
            {step === 6 && (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <Typography variant="h6">Upload Profile Photo</Typography>
                    {/* ✅ Fix Image Rendering */}
                    {formData.profilePhoto ? (
                        <Avatar
                            src={typeof formData.profilePhoto === "string" ? formData.profilePhoto : URL.createObjectURL(formData.profilePhoto)}
                            sx={{ width: 120, height: 120, border: "4px solid #1e3a8a" }}
                        />
                    ) : (
                        <Avatar src="/default-avatar.png" sx={{ width: 120, height: 120, border: "4px solid #1e3a8a" }} />
                    )}
                    <input type="file" id="upload-photo" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
                    <label htmlFor="upload-photo">
                        <Button variant="contained" component="span">
                            Choose File
                        </Button>
                    </label>
                </Box>
            )}
        </Paper>
    );

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
            <Container maxWidth="sm">
                <IconButton onClick={() => navigate(-1)} sx={{ position: "absolute", top: 20, left: 20 }}>
                    <ArrowBackIosNewIcon />
                </IconButton>

                <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>
                    Profile Setup ({activeStep + 1} / {steps.length})
                </Typography>

                <LinearProgress variant="determinate" value={(activeStep / steps.length) * 100} sx={{ mb: 2 }} />

                {renderStepContent(activeStep)}

                <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
                    {activeStep > 0 && <Button variant="outlined" onClick={handleBack}>Back</Button>}
                    {activeStep < steps.length - 1 ? (
                        <Button variant="contained" onClick={handleNext}>
                            {loading ? "Saving..." : "Next"}
                        </Button>
                    ) : (
                        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default ProfileSetup;
