import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

const UpdateWhyChooseUs = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [whychooseusId, setwhychooseusId] = useState("");
  const [whychooseus, setwhychooseus] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    }, []);
  // Fetch data when whychooseusId changes
  useEffect(() => {
    if (whychooseusId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/homewhychooseus/getbyid/${whychooseusId}`
          );
          setwhychooseus(response.data[0]);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      fetchData();
    }
  }, [whychooseusId]);

  // Set whychooseusId from location state
  useEffect(() => {
    if (location.state && location.state.id) {
      setwhychooseusId(location.state.id);
    } else {
      console.warn("No ID found in location.state");
    }
  }, [location.state]);

  const handleFormSubmit = async (values) => {
    try {
      await axios.put(
        `${API_URL}/homewhychooseus/update/${lang}/${whychooseusId}`,
        {
          title: values.title,
          subtitle: values.subtitle,
          description: values.description,
          button: values.button,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAlert({
        open: true,
        message: lang === "ar" ? "تم التعديل بنجاح" : "Update successful!",
        severity: "success",
      });
      setTimeout(() => {
        navigate(`/${lang}/whychooseus`);
      }, 2000);
    } catch (error) {
      console.error("Error updating data:", error);
      setAlert({
        open: true,
        message: "Update failed. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Box m="20px">
      <Header
        title={
          lang === "ar" ? "تعديل لماذا تختارنا" : "UPDATE Why Choose Us HOME"
        }
        subtitle={
          lang === "ar"
            ? "تعديل لماذا تختارنا"
            : "Update an Existing Why Choose Us"
        }
      />

      {alert.open && (
        <Alert
          severity={alert.severity}
          sx={{
            backgroundColor:
              alert.severity === "success" ? "#365486" : "#f8d7da",
            marginBottom: "2vh",
            color: alert.severity === "success" ? "#fff" : "#721c24",
            "& .MuiAlert-icon": {
              color: alert.severity === "success" ? "#fff" : "#721c24",
            },
            "& .MuiAlert-message": {
              fontWeight: "bold",
            },
          }}
          onClose={() => setAlert({ ...alert, open: false })}
        >
          {alert.message}
        </Alert>
      )}

      <Formik
        enableReinitialize={true} // Important to reinitialize when whychooseus changes
        initialValues={{
          title: whychooseus.title || "",
          subtitle: whychooseus.subtitle || "",
          description: whychooseus.description || "",
          button: whychooseus.button || "",
        }}
        onSubmit={handleFormSubmit}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
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
                value={values.title} // Correct usage of Formik values
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={lang === "ar" ? "العنوان الفرعي" : "SubTitle"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.subtitle} // Correct usage of Formik values
                name="subtitle"
                error={!!touched.subtitle && !!errors.subtitle}
                helperText={touched.subtitle && errors.subtitle}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={lang === "ar" ? "الفقرة" : "Paragraph"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description} // Correct usage of Formik values
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
                multiline
                rows={6}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={lang === "ar" ? "زر التنقل" : "Button"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.button} // Correct usage of Formik values
                name="button"
                error={!!touched.button && !!errors.button}
                helperText={touched.button && errors.button}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {lang === "ar" ? "تعديل" : " Update "}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  subtitle: yup.string().required("Subtitle is required"),
  description: yup.string().required("Description is required"),
  button: yup.string().required("Button is required"),
});

export default UpdateWhyChooseUs;
