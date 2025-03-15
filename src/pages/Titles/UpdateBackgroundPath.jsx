import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

const UpdateBackgrounPath = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [backgroundpathId, setbackgroundpathId] = useState("");
  const [backgroundpath, setbackgroundpath] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    }, []);
  // Fetch data when backgroundpathId changes
    // Set backgroundpathId from location state
    useEffect(() => {
        if (location.state && location.state.id) {
          setbackgroundpathId(location.state.id);
        } else {
          console.warn("No ID found in location.state");
        }
      }, [location.state]);
  useEffect(() => {
    // if (backgroundpathId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/backgroundpath/getbyid/${location.state.id}`
          );
          setbackgroundpath(response.data);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      fetchData();
    
  }, [backgroundpathId]);



  const handleFormSubmit = async (values) => {
    try {
      await axios.put(
        `${API_URL}/backgroundpath/update/${lang}/${backgroundpathId}`,
        {
          title: values.title,
          subtitle: values.subtitle,
          path: values.path,
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
        navigate(`/${lang}/titles`);
      }, 1500);
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
          lang === "ar" ? "تعديل  الخلفية" : "UPDATE Background Path"
        }
        subtitle={
          lang === "ar"
            ? "تعديل الخلفية "
            : "Update an Background Path"
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
        enableReinitialize={true} // Important to reinitialize when backgroundpath changes
        initialValues={{
          title: backgroundpath.title || "",
          subtitle: backgroundpath.subtitle || "",
          path: backgroundpath.path || "",
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
                label={lang === "ar" ? "الرابط" : "path"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.path} // Correct usage of Formik values
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
                disabled
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
  path: yup.string().required("Path is required"),
});

export default UpdateBackgrounPath;
