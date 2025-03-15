import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import { useLocation ,useNavigate } from "react-router-dom";
import axios from "axios";

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const lang = location.pathname.split("/")[1] || "en"; // Get the language from the path, default to 'en'
  const API_URL = process.env.REACT_APP_API_URL;

  // Function to toggle language
  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ar" : "en"; // Toggle between English and Arabic
    navigate(`/${newLang}`); // Navigate to the new language path
  };
  const logoutuser = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      if (response.data.Status === "Logout Success") {
        navigate('/login'); // Redirect to login or desired route
        localStorage.removeItem('isAuthenticated')
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}
     
     <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {lang === 'ar' ? "كاسل": "Kassel"}

                </Typography>
                {/* <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography> */}
              </Box>
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
       
        <IconButton>
          <LogoutIcon onClick={logoutuser} />
        </IconButton>
         {/* Language Switcher */}
         <IconButton onClick={toggleLanguage}>
          <LanguageIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
