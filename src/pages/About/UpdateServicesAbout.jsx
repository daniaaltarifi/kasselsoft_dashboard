import { Box, Button, TextField, Alert, Snackbar } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { tokens } from "../../theme";
import {  Typography, useTheme } from "@mui/material";

function UpdateServicesAbout() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const location = useLocation();
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ type: "", message: "", visible: false });
    const [AboutServicesId, setAboutServicesId] = useState("");
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { lang } = useParams();
    const API_URL = process.env.REACT_APP_API_URL;
    const [initialValues, setInitialValues] = useState({
        title: "",
        icon: "",
      
    });

    // Set AboutServicesId from location state
    useEffect(() => {
        if (location.state && location.state.id) {
            setAboutServicesId(location.state.id);
        } else {
            console.warn("No ID found in location.state");
        }
    }, [location.state]);

    // Fetch team data by id
    useEffect(() => {
        window.scrollTo(0, 0);
        if (AboutServicesId) {
            axios.get(`${API_URL}/AboutServices/getbyid/${AboutServicesId}`)
                .then((response) => {
                    const contactData = response.data; // Since data is an object, no need for [0]
                    if (contactData) {
                        setInitialValues({
                            name: contactData.title || "",
                            icon: contactData.icon || "",
                          
                        });
                    } else {
                        console.warn("No data found for the given ID");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching team data:", error);
                });
        }
    }, [AboutServicesId]);
    
    

    const handleFormSubmit = async (values) => {
        try {
            await axios.put(`${API_URL}/AboutServices/updateaboutServices/${lang}/${AboutServicesId}`, values);
            setAlert({ open: true, message: lang === 'ar' ? "تم التعديل بنجاح" : "Update successful!", severity: "success" });

            // Delay navigation after success
            setTimeout(() => {
                navigate(`/${lang}/teamAbout`);
            }, 2000);
        } catch (error) {
            console.error(`Error in fetch edit data: ${error}`);
            setAlert({ open: true, message: "Update failed. Please try again.", severity: "error" });
        }
    };

const handleButtonClick = () => {
    window.open('https://icons.getbootstrap.com/', '_blank');
  };

    return (
        <Box m="20px">
            <Header 
               title={lang === "ar" ? "الخدمات المقدمة  " : "Services Introduced"}
               subtitle={lang === "ar" ?"يجب عليك اختيار الايقونة من خلال النقر على هذا الزر للانتقال إلى الموقع"  : "You should choose icon from click on this button to navigate to the website icon"}
            />
          <Box display="flex" mb="20px">
  <Button
    type="submit"
    color="secondary"
    variant="contained"
    onClick={handleButtonClick} // Add this line
  >
    {lang === 'ar' ? 'اختر ايقون' : 'Choose icon'}
  </Button>
</Box>
            {/* Alert Snackbar */}
            <Snackbar open={alert.open} autoHideDuration={4000} onClose={() => setAlert({ ...alert, open: false })}>
                <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>

            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
            >
                {({
                    values,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label={lang === "ar" ? "العنوان" : "Title"}
                                InputLabelProps={{
                                    sx: {
                                      textAlign: lang === "ar" ? "right" : "left",
                                      right: lang === "ar" ? 15 : 'auto',
                                      left: lang === "ar" ? 'auto' : 0,
                                    },
                                  }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.title}
                                name="title"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label={lang === "ar" ? " ايقون" : "Icon"}
                                InputLabelProps={{
                                    sx: {
                                      textAlign: lang === "ar" ? "right" : "left",
                                      right: lang === "ar" ? 15 : 'auto',
                                      left: lang === "ar" ? 'auto' : 0,
                                    },
                                  }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.icon}
                                name="icon"
                                sx={{ gridColumn: "span 2" }}
                            />
                           
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                {lang === "ar" ? "تعديل" : "EDIT"}
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
}

export default UpdateServicesAbout;
