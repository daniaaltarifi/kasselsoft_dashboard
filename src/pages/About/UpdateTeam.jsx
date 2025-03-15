import { Box, Button, TextField, Alert, Snackbar } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function UpdateTeam() {
    const location = useLocation();
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    const [alert, setAlert] = useState({ type: "", message: "", visible: false });
    const [AboutTemeId, setAboutTemeId] = useState("");
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { lang } = useParams();
    const [initialValues, setInitialValues] = useState({
        name: "",
        projects: "",
        major: "",
    });

    // Set AboutTemeId from location state
    useEffect(() => {
        if (location.state && location.state.id) {
            setAboutTemeId(location.state.id);
        } else {
            console.warn("No ID found in location.state");
        }
    }, [location.state]);

    // Fetch team data by id
    useEffect(() => {
        window.scrollTo(0, 0);
        if (AboutTemeId) {
            axios.get(`${API_URL}/abuteteam/getbyid/${AboutTemeId}`)
                .then((response) => {
                    const contactData = response.data; // Since data is an object, no need for [0]
                    if (contactData) {
                        setInitialValues({
                            name: contactData.name || "",
                            projects: contactData.projects || "",
                            major: contactData.major || "",
                        });
                    } else {
                        console.warn("No data found for the given ID");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching team data:", error);
                });
        }
    }, [AboutTemeId]);
    
    

    const handleFormSubmit = async (values) => {
        try {
            await axios.put(`${API_URL}/abuteteam/update/${lang}/${AboutTemeId}`, values);
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

    return (
        <Box m="20px">
            <Header 
             title={lang === "ar" ? "  نحن" : "ABOUT Team"}
                subtitle= {lang === "ar" ?"تعديل معلومات عضو للفريق" : "Edit team member information"}
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
                                label={lang === "ar" ? "الاسم" : "Name"}
                                InputLabelProps={{
                                    sx: {
                                      textAlign: lang === "ar" ? "right" : "left",
                                      right: lang === "ar" ? 15 : 'auto',
                                      left: lang === "ar" ? 'auto' : 0,
                                    },
                                  }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label={lang === "ar" ? " المشاريع" : "Projects"}
                                InputLabelProps={{
                                    sx: {
                                      textAlign: lang === "ar" ? "right" : "left",
                                      right: lang === "ar" ? 15 : 'auto',
                                      left: lang === "ar" ? 'auto' : 0,
                                    },
                                  }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.projects}
                                name="projects"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label={lang === "ar" ? "التخصص" : "Major"}
                                InputLabelProps={{
                                    sx: {
                                      textAlign: lang === "ar" ? "right" : "left",
                                      right: lang === "ar" ? 15 : 'auto',
                                      left: lang === "ar" ? 'auto' : 0,
                                    },
                                  }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.major}
                                name="major"
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

export default UpdateTeam;
