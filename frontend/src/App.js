import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UserProfileSetup from "./pages/UserProfileSetup";
import ProfileCard from "./pages/ProfileCard";
import Dashboard from "./pages/Dashboard";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeProviderWrapper } from "./context/ThemeContext";
import ViewProfile from "./components/ViewProfile";

const App = () => {
  return (
    <ThemeProviderWrapper>
      <CssBaseline />
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/profile-setup" element={<UserProfileSetup />} />
          <Route path="/profile-card" element={<ProfileCard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/:id" element={<ViewProfile />} /> {/* View Profile Route */}
        </Routes>
        {/* <Footer /> */}
      </Router>
    </ThemeProviderWrapper>
  );
};

export default App;














// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   MenuItem,
//   Select,
//   TextField,
//   Grid,
//   CircularProgress,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import axios from "axios";

// const ModalForm = () => {
//   const [open, setOpen] = useState(false);
//   const [vendorsData, setVendorsData] = useState([]); // Store API response
//   const [platforms, setPlatforms] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(false); // Loading state for GET API

//   // Form State
//   const [formData, setFormData] = useState({
//     vendor: "",
//     platform: "",
//     remark: "",
//     parent_template_id: "",
//     template_file: null, // File Upload
//   });

//   // Snackbar State
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   // GET API Call to fetch Vendor and Platform data
//   useEffect(() => {
//     const fetchVendors = async () => {
//       setFetching(true);
//       try {
//         const response = await axios.get("YOUR_GET_API_URL_HERE"); // Replace with actual API
//         setVendorsData(response.data.data); // Store API response in state
//       } catch (error) {
//         setErrorMessage("Failed to fetch vendor data.");
//         setSnackbarOpen(true);
//       } finally {
//         setFetching(false);
//       }
//     };
//     fetchVendors();
//   }, []);

//   // Handle vendor selection
//   const handleVendorChange = (event) => {
//     const vendor = event.target.value;
//     setFormData((prev) => ({ ...prev, vendor, platform: "" }));

//     const vendorData = vendorsData.find((item) => item.vendor === vendor);
//     setPlatforms(vendorData ? vendorData.platform : []);
//   };

//   // Handle input change
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle File Upload
//   const handleFileChange = (event) => {
//     setFormData((prev) => ({ ...prev, template_file: event.target.files[0] }));
//   };

//   // Open modal
//   const handleOpen = () => {
//     setOpen(true);
//   };

//   // Close modal and reset fields
//   const handleClose = () => {
//     setOpen(false);
//     setFormData({
//       vendor: "",
//       platform: "",
//       remark: "",
//       parent_template_id: "",
//       template_file: null,
//     });
//     setPlatforms([]);
//   };

//   // Submit form (POST API call)
//   const handleSubmit = async () => {
//     if (!formData.vendor || !formData.platform) {
//       setErrorMessage("Vendor and Platform are required.");
//       setSnackbarOpen(true);
//       return;
//     }

//     setLoading(true);
//     const formDataPayload = new FormData();
//     formDataPayload.append("vendor", formData.vendor);
//     formDataPayload.append("platform", formData.platform);
//     formDataPayload.append("remark", formData.remark);
//     formDataPayload.append("parent_template_id", formData.parent_template_id);
//     if (formData.template_file) {
//       formDataPayload.append("template_file", formData.template_file);
//     }

//     try {
//       const response = await axios.post("YOUR_POST_API_URL_HERE", formDataPayload, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setSuccessMessage("Data submitted successfully!");
//       setSnackbarOpen(true);
//       handleClose(); // Close modal on success
//     } catch (error) {
//       setErrorMessage("Failed to submit data. Try again.");
//       setSnackbarOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Button variant="contained" color="primary" onClick={handleOpen} disabled={fetching}>
//         {fetching ? <CircularProgress size={24} /> : "Deploy"}
//       </Button>

//       {/* Snackbar for success & error messages */}
//       <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
//         {successMessage ? (
//           <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
//             {successMessage}
//           </Alert>
//         ) : errorMessage ? (
//           <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
//             {errorMessage}
//           </Alert>
//         ) : null}
//       </Snackbar>

//       {/* Modal */}
//       <Dialog open={open} onClose={handleClose} fullWidth>
//         <DialogTitle>Deploy Configuration</DialogTitle>
//         <DialogContent>
//           {fetching ? (
//             <CircularProgress size={40} />
//           ) : (
//             <>
//               <Grid container spacing={2} alignItems="center">
//                 {/* Vendor Field */}
//                 <Grid item xs={6}>
//                   <Select
//                     fullWidth
//                     name="vendor"
//                     value={formData.vendor}
//                     onChange={handleVendorChange}
//                     displayEmpty
//                   >
//                     <MenuItem value="" disabled>
//                       Select Vendor
//                     </MenuItem>
//                     {vendorsData.map((item, index) => (
//                       <MenuItem key={index} value={item.vendor}>
//                         {item.vendor}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </Grid>

//                 {/* Platform Field (Initially Disabled) */}
//                 <Grid item xs={6}>
//                   <Select
//                     fullWidth
//                     name="platform"
//                     value={formData.platform}
//                     onChange={handleInputChange}
//                     displayEmpty
//                     disabled={!formData.vendor} // Disabled when no vendor is selected
//                   >
//                     <MenuItem value="" disabled>
//                       Select Platform
//                     </MenuItem>
//                     {platforms.map((platform, index) => (
//                       <MenuItem key={index} value={platform}>
//                         {platform}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </Grid>
//               </Grid>

//               {/* Parent Template ID Input */}
//               <TextField
//                 fullWidth
//                 label="Parent Template ID"
//                 name="parent_template_id"
//                 value={formData.parent_template_id}
//                 onChange={handleInputChange}
//                 sx={{ mt: 2 }}
//               />

//               {/* Remark Input Field */}
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={3}
//                 label="Remark"
//                 name="remark"
//                 value={formData.remark}
//                 onChange={handleInputChange}
//                 sx={{ mt: 2 }}
//               />

//               {/* File Upload */}
//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 style={{ marginTop: "16px", display: "block" }}
//               />
//             </>
//           )}
//         </DialogContent>

//         {/* Modal Actions */}
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary">
//             Cancel
//           </Button>
//           <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading || fetching}>
//             {loading ? "Submitting..." : "Submit"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default ModalForm;
