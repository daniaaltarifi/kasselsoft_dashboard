import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

const AddServices = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [img, setImg] = useState(null);

  const [services, setservices] = useState([]);
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
    if (!img) {
      setAlert({
        open: true,
        message: lang === "ar" ? "الرجاء اضافة صورة" : "Please Add img !",
        severity: "error",
      });
    }
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("img", img);
      const response = await axios.post(
        `${API_URL}/services/add/${lang}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setservices(response.data);
      setAlert({
        open: true,
        message: lang === "ar" ? "تمت الاضافة بنجاح" : "Added successful!",
        severity: "success",
      });

      setTimeout(() => {
        navigate(`/${lang}/services`);
      }, 1500);
    } catch (error) {
      console.log(`Error fetching post data ${error}`);
    }
  };

  const handleImg = (e) => {
    setImg(e.target.files[0]);
  };

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "اضافة الخدمات" : "Add Service"}
        subtitle={lang === "ar" ? "بيانات الخدمات" : "List of Services"}
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
          title: services.title || "",
          description: services.description || "",
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
            
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4",marginTop: "10px"},
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
              />

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
                sx={{ gridColumn: "span 2" }}
                multiline
                rows={8}
              />

              <TextField
                sx={{ gridColumn: "span 4",paddingTop:"20px" }}
                label={lang === "ar" ? "الصورة" : "Img"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 18 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                variant="outlined"
                type="file"
                onChange={handleImg}
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
});

export default AddServices;
