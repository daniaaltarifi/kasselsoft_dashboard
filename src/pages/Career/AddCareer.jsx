import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

const AddCareer = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const [career, setcareer] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    }, []);
  
  const handleFormSubmit = async (values) => {
    try {
      await axios.post(
        `${API_URL}/careers/add/${lang}`,
        {
           position_name: values.position_name,
        location: values.location,
        exp: values.exp,
        description: values.description,
        responsabilites: values.responsabilites, // Match with schema
        requirment: values.requirment, // Match with schema
        benefit: values.benefit,
        open_count: values.open_count,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAlert({
        open: true,
        message: lang === "ar" ? "تم الاضافة بنجاح" : "Added successful!",
        severity: "success",
      });
      setTimeout(() => {
        navigate(`/${lang}/career`);
      }, 1500);
    } catch (error) {
      console.error("Error adding data:", error);
      setAlert({
        open: true,
        message: "added failed. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Box m="20px">
      <Header
        title={
          lang === "ar" ? "اضافة وظيفة" : "Add Career"
        }
        subtitle={
          lang === "ar"
            ? "اضافة وظيفة "
            : "Add Career"
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
        enableReinitialize={true} // Important to reinitialize when career changes
        initialValues={{
            position_name: career.position_name || "",
            location: career.location || "",
            exp: career.exp || "",
            description: career.description || "",
            responsabilites: career.responsabilites || "",
            requirment: career.requirment || "",
            benefit: career.benefit || "",
            open_count: career.open_count || "",
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
                label={lang === "ar" ? "العنوان" : "Position Name"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.position_name}
                name="position_name"
                error={!!touched.position_name && !!errors.position_name}
                helperText={touched.position_name && errors.position_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label={lang === "ar" ? "الموقع" : "Location"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label={lang === "ar" ? "الخبرة" : "Experience"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.exp}
                name="exp"
                error={!!touched.exp && !!errors.exp}
                helperText={touched.exp && errors.exp}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                label={lang === "ar" ? "عدد الشواغر" : "Open Count"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.open_count}
                name="open_count"
                error={!!touched.open_count && !!errors.open_count}
                helperText={touched.open_count && errors.open_count}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label={lang === "ar" ? "الوصف" : "Description"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
                rows={8}
                multiline
              />
              <TextField
                fullWidth
                variant="filled"
                label={lang === "ar" ? "المسؤوليات" : "Responsibilities"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.responsabilites}
                name="responsabilites" // Correctly named
                error={!!touched.responsabilites && !!errors.responsabilites}
                helperText={touched.responsabilites && errors.responsabilites}
                sx={{ gridColumn: "span 2" }}
                rows={8}
                multiline
              />
              <TextField
                fullWidth
                variant="filled"
                label={lang === "ar" ? "المتطلبات" : "requirment"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.requirment} // Correctly named
                name="requirment" // Correctly named
                error={!!touched.requirment && !!errors.requirment}
                helperText={touched.requirment && errors.requirment}
                sx={{ gridColumn: "span 2" }}
                rows={8}
                multiline
              />
              <TextField
                fullWidth
                variant="filled"
                label={lang === "ar" ? "المزايا" : "Benefit"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.benefit}
                name="benefit"
                error={!!touched.benefit && !!errors.benefit}
                helperText={touched.benefit && errors.benefit}
                sx={{ gridColumn: "span 2" }}
                rows={8}
                multiline
              />
         
             
             
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {lang === "ar" ? "اضافة" : " Add "}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
    position_name: yup.string().required("Position name is required"),
    description: yup.string().required("Description is required"),
    location: yup.string().required("Location is required"),
    exp: yup.string().required("Experience is required"),
    responsabilites: yup.string().required("responsabilites are required"), // Match this
    requirment: yup.string().required("requirment are required"), // Match this
    benefit: yup.string().required("Benefit is required"),
    open_count: yup.string().required("Open count is required"),
  });
export default AddCareer;
