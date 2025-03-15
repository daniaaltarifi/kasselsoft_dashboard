import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Alert, Stack,Snackbar } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
function AddServicesAbout() {
    const navigate = useNavigate();
  const { lang } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const API_URL = process.env.REACT_APP_API_URL;

  // State for showing success/error messages
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });
useEffect(()=>{
window.scrollTo(0,0);
},)
  // Handle form submission
  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        `${API_URL}/aboutServices/add/${lang}`,
        values
      );
      
      setAlert({ open: true, message: lang === 'ar' ? "تم الاضافه بنجاح" : " added successfully!", severity: "success" });
        // Delay navigation after success
        setTimeout(() => {
            navigate(`/${lang}/teamAbout`);
        }, 2000);
      resetForm(); // Reset the form fields after successful submission
    } catch (error) {
      console.error("Error adding contact information:", error);
      setAlert({
        type: "error",
        message: "Failed to add contact information. Please try again.",
        visible: true,
      });
    } finally {
      setSubmitting(false); // Set submitting to false once request is complete
    }
  };
  const handleButtonClick = () => {
    window.open('https://icons.getbootstrap.com/', '_blank');
  };
  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "  نحن" : "ABOUT Services"}
        subtitle={
          lang === "ar" ?"يجب عليك اختيار الايقونة من خلال النقر على هذا الزر للانتقال إلى الموقع" : "You should choose icon from click on this button to navigate to the website icon"
        }
      />
 <Button
    type="submit"
    color="secondary"
    variant="contained"
    onClick={handleButtonClick} // Add this line
    sx={{marginBottom: 5}}
  >
    {lang === 'ar' ? 'اختر ايقون' : 'Choose icon'}
  </Button>
       {/* Alert Snackbar */}
       <Snackbar open={alert.open} autoHideDuration={4000} onClose={() => setAlert({ ...alert, open: false })}>
                <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
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
                label={lang === "ar" ? "الاسم" : "title"}
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
                label={lang === "ar" ? " الايقونة" : "icon"}
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
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting} // Disable button while submitting
              >
                {lang === "ar" ? "إضافه جديده" : "ADD"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

const initialValues = {
    title: "",
    icon: "",
};

export default AddServicesAbout;