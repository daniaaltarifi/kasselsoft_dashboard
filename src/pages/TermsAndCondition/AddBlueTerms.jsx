import { Box, Button, TextField,Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const AddBlueTerms = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [blueterms, setblueterms] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // Fetch data when cardhomeId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${API_URL}/termsandconditions/addblue/${lang}`,
        {
          title: values.title,
          description: values.description,
          page_type: values.page_type,
        },
        {
          headers: {
            "Content-Type": "application/json", // Use JSON content type
          },
        }
      );
  
      setblueterms(response.data);
      setAlert({
        open: true,
        message: lang === "ar" ? "تمت الاضافة بنجاح" : "Added successfully!",
        severity: "success",
      });
  
      setTimeout(() => {
        navigate(`/${lang}/termsandcondition`);
      }, 1500);
    } catch (error) {
      console.log(`Error fetching post data: ${error.response?.data || error.message}`);
      setAlert({
        open: true,
        message: "Error adding black term. Please check your input.",
        severity: "error",
      });
    }
  };
  

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "اضافة شروط" : "Add Blue Terms"}
        subtitle={lang === "ar" ? "بيانات الشروط" : "List of bluek terms"}
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
        enableReinitialize={true} // Important to reinitialize when cardhome changes
        onSubmit={handleFormSubmit}
        validationSchema={checkoutSchema}
        initialValues={{
          title: blueterms.title || "",
          description: blueterms.description || "",
          page_type: blueterms.page_type || "",
        }}
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
     {/* <Typography sx={{ gridColumn: "span 4" }}>
                {lang === "ar"
                  ? " إذا كنت تريد إضافة سطر جديد بين الوصف، أضف هذا النص:<br>"
                  : "if you want to add a new line between description, add this text: &lt;br&gt"}
              </Typography> */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
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
                value={values.description} // Correct usage of Formik values
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
                multiline
                rows={8}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={lang === "ar" ? "اسم الصفحة" : "page_type"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.page_type} // Correct usage of Formik values
                name="page_type"
                error={!!touched.page_type && !!errors.page_type}
                helperText={touched.page_type && errors.page_type}
                sx={{ gridColumn: "span 2" }}
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
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  page_type: yup.string().required("page_type is required"),
});

export default AddBlueTerms;
