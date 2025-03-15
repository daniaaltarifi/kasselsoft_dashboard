import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from '@mui/material/Alert';

const UpdateTermsAndCondition = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [img_Interpretation, setimg_Interpretation] = useState(null);
  const [severability_img, setSeverability_img] = useState(null);
  const [termsandconditionId, settermsandconditionId] = useState("");
  const [termsandcondition, settermsandcondition] = useState({});
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.state && location.state.id) {
      settermsandconditionId(location.state.id);
    } else {
      console.warn('No ID found in location.state');
    }

    if (termsandconditionId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_URL}/termsandconditions/terms/getbyid/${termsandconditionId}`);
          settermsandcondition(response.data[0]);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      fetchData();
    }
  }, [termsandconditionId]);

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("main_title", values.main_title);
      formData.append("main_subtitle", values.main_subtitle);
      formData.append("main_description", values.main_description);
      formData.append("tiltle_Interpretation", values.tiltle_Interpretation);
      formData.append("description_Interpretation", values.description_Interpretation);
      if (img_Interpretation) {
        formData.append("img_Interpretation", img_Interpretation);
      }
      formData.append("Severability_title", values.Severability_title);
      formData.append("Severability_description", values.Severability_description);
      if (severability_img) {
        formData.append("Severability_img", severability_img);
      }
      formData.append("page_type", values.page_type);

      await axios.put(`${API_URL}/termsandconditions/update/${lang}/${termsandconditionId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAlert({ open: true, message: lang === 'ar' ? "تم التعديل بنجاح" : "Update successful!", severity: "success" });
      setTimeout(() => {
        navigate(`/${lang}/termsandcondition`);
      }, 2000);
    } catch (error) {
      console.error(`Error in fetch edit data: ${error}`);
      setAlert({ open: true, message: "Update failed. Please try again.", severity: "error" });
    }
  };

  const handleimg_Interpretation = (e) => {
    setimg_Interpretation(e.target.files[0]);
  };

  const handleSeverability_img = (e) => {
    setSeverability_img(e.target.files[0]);
  };

  return (
    <Box m="20px">
      <Header title={lang === "ar" ? "تعديل الشروط والاحكام" : "UPDATE Terms And Condition"} subtitle={lang === "ar" ? "تعديل الشروط والاحكام" : "Update an Existing Terms And Condition"} />

      {alert.open && (
        <Alert
          severity={alert.severity}
          sx={{
            backgroundColor: alert.severity === "success" ? "#365486" : "#f8d7da",
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
        enableReinitialize={true}
        initialValues={{
          main_title: termsandcondition.main_title || "",
          main_subtitle: termsandcondition.main_subtitle || "",
          main_description: termsandcondition.main_description || "",
          tiltle_Interpretation: termsandcondition.tiltle_Interpretation || "",
          description_Interpretation: termsandcondition.description_Interpretation || "",
          Severability_title: termsandcondition.Severability_title || "",
          Severability_description: termsandcondition.Severability_description || "",
          page_type: termsandcondition.page_type || "",
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
                label={lang === "ar" ? " العنوان الرئيسي" : "main_title"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.main_title}
                name="main_title"
                error={!!touched.main_title && !!errors.main_title}
                helperText={touched.main_title && errors.main_title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label={lang === "ar" ? "العنوان الفرعي" : "main_subtitle"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.main_subtitle}
                name="main_subtitle"
                error={!!touched.main_subtitle && !!errors.main_subtitle}
                helperText={touched.main_subtitle && errors.main_subtitle}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label={lang === "ar" ? " الوصف الرئيسي" : "main_description"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.main_description}
                name="main_description"
                error={!!touched.main_description && !!errors.main_description}
                helperText={touched.main_description && errors.main_description}
                sx={{ gridColumn: "span 4" }}
                multiline
                rows={7}
              />
              <TextField
                fullWidth
                variant="filled"
                label={lang === "ar" ? "العنوان" : "tiltle_Interpretation"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tiltle_Interpretation}
                name="tiltle_Interpretation"
                error={!!touched.tiltle_Interpretation && !!errors.tiltle_Interpretation}
                helperText={touched.tiltle_Interpretation && errors.tiltle_Interpretation}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label={lang === "ar" ? "الوصف" : "description_Interpretation"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description_Interpretation}
                name="description_Interpretation"
                error={!!touched.description_Interpretation && !!errors.description_Interpretation}
                helperText={touched.description_Interpretation && errors.description_Interpretation}
                sx={{ gridColumn: "span 4" }}
                multiline
                rows={8}
              />
              <TextField
                sx={{ gridColumn: "span 4",paddingTop:"20px" }}
                label={lang === "ar" ? "الصورة" : "img_Interpretation"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 18 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                variant="outlined"
                type="file"
                onChange={handleimg_Interpretation}
              />
              <TextField
                fullWidth
                variant="filled"
                label={lang === "ar" ? "العنوان" : "Severability_title"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Severability_title}
                name="Severability_title"
                error={!!touched.Severability_title && !!errors.Severability_title}
                helperText={touched.Severability_title && errors.Severability_title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label={lang === "ar" ? "الوصف" : "Severability_description"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Severability_description}
                name="Severability_description"
                error={!!touched.Severability_description && !!errors.Severability_description}
                helperText={touched.Severability_description && errors.Severability_description}
                sx={{ gridColumn: "span 4" }}
                multiline
                rows={8}
              />
              <TextField
                sx={{ gridColumn: "span 4",paddingTop:"20px" }}
                label={lang === "ar" ? "الصورة" : "Severability_img"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 18 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                variant="outlined"
                type="file"
                onChange={handleSeverability_img}
              />
              <TextField
                fullWidth
                variant="filled"
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
                value={values.page_type}
                name="page_type"
                error={!!touched.page_type && !!errors.page_type}
                helperText={touched.page_type && errors.page_type}
                sx={{ gridColumn: "span 2" }}
                disabled
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {lang === "ar" ? "تعديل" : "Update"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  main_title: yup.string().required("Main title is required"),
  main_subtitle: yup.string().required("Main subtitle is required"),
  main_description: yup.string().required("Main description is required"),
  // tiltle_Interpretation: yup.string().required("Title interpretation is required"),
  // description_Interpretation: yup.string().required("Description interpretation is required"),
  // Severability_title: yup.string().required("Severability title is required"),
  // Severability_description: yup.string().required("Severability description is required"),
  page_type: yup.string().required("Page type is required"),
});

export default UpdateTermsAndCondition;
