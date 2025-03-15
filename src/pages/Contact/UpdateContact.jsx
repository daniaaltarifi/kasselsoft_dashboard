import { Box, Button, TextField, Alert, Snackbar } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function UpdateContact() {
    const location = useLocation();
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    const [alert, setAlert] = useState({ type: "", message: "", visible: false });
    const [infoContacteId, setInfoContacteId] = useState("");
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { lang } = useParams();
    const [initialValues, setInitialValues] = useState({
        title: "",
        subtitle: "",
        link: "",
    });

    // Set infoContacteId from location state
    useEffect(() => {
        if (location.state && location.state.id) {
            setInfoContacteId(location.state.id);
        } else {
            console.warn("No ID found in location.state");
        }
    }, [location.state]);

    // Fetch contact footer data by id
    useEffect(() => {
        if (infoContacteId) {
            axios.get(`${API_URL}/contactfooter/getbyid/${infoContacteId}`)
                .then((response) => {
                    const contactData = response.data[0]; // Assuming data is returned as an array
                    setInitialValues({
                        title: contactData.title || "",
                        subtitle: contactData.subtitle || "",
                        link: contactData.link || "",
                    });
                })
                .catch((error) => {
                    console.error("Error fetching contact footer:", error);
                });
        }
    }, [infoContacteId]);

    const handleFormSubmit = async (values) => {
        try {
            await axios.put(`${API_URL}/contactfooter/update/${lang}/${infoContacteId}`, values);
            setAlert({ open: true, message: lang === 'ar' ? "تم التعديل بنجاح" : "Update successful!", severity: "success" });

            // Delay navigation after success
            setTimeout(() => {
                navigate(`/${lang}/infContact`);
            }, 2000);
        } catch (error) {
            console.error(`Error in fetch edit data: ${error}`);
            setAlert({ open: true, message: "Update failed. Please try again.", severity: "error" });
        }
    };

    return (
        <Box m="20px">
            <Header 
                title={lang === "ar" ? "  معلومات التواصل" : " CONTACT INFORMATION"}
                subtitle={lang === "ar" ? " تعديل معلومات التواصل" : "EDIT CONTACT INFORMATION"}
            />
            
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
                                label={lang === "ar" ? "العنوان الفرعي" : "Subtitle"}
                                InputLabelProps={{
                                    sx: {
                                      textAlign: lang === "ar" ? "right" : "left",
                                      right: lang === "ar" ? 15 : 'auto',
                                      left: lang === "ar" ? 'auto' : 0,
                                    },
                                  }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.subtitle}
                                name="subtitle"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label={lang === "ar" ? "الرابط" : "Link"}
                                InputLabelProps={{
                                    sx: {
                                      textAlign: lang === "ar" ? "right" : "left",
                                      right: lang === "ar" ? 15 : 'auto',
                                      left: lang === "ar" ? 'auto' : 0,
                                    },
                                  }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.link}
                                name="link"
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

export default UpdateContact;
