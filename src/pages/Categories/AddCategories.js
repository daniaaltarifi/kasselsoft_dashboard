import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const AddCategories = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(`${API_URL}/categories/addCategory`, {
        categoryName: values.categoryName,
        lang: values.lang
      });

      setAlert({
        open: true,
        message: lang === "ar" ? "تمت الإضافة بنجاح" : "Category added successfully!",
        severity: "success",
      });

      setTimeout(() => {
        navigate(`/${lang}/categories`);
      }, 1500);
    } catch (error) {
      setAlert({
        open: true,
        message: lang === "ar" ? "خطأ في الإضافة" : "Error adding category",
        severity: "error",
      });
      console.error("Error adding category:", error);
    }
  };

  const checkoutSchema = yup.object().shape({
    categoryName: yup.string().required(lang === "ar" ? "مطلوب" : "Required"),
    lang: yup.string().required(lang === "ar" ? "مطلوب" : "Required")
  });

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "إضافة فئة جديدة" : "Add New Category"}
        subtitle={lang === "ar" ? "بيانات الفئة الجديدة" : "New Category Details"}
      />

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
        onSubmit={handleFormSubmit}
        validationSchema={checkoutSchema}
        initialValues={{
          categoryName: "",
          lang: lang // Default to current language
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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4", marginTop: "10px" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={lang === "ar" ? "اسم الفئة" : "Category Name"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.categoryName}
                name="categoryName"
                error={!!touched.categoryName && !!errors.categoryName}
                helperText={touched.categoryName && errors.categoryName}
              />

              <FormControl fullWidth variant="filled">
                <InputLabel id="lang-label">
                  {lang === "ar" ? "اللغة" : "Language"}
                </InputLabel>
                <Select
                  labelId="lang-label"
                  name="lang"
                  value={values.lang}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.lang && !!errors.lang}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="ar">العربية</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {lang === "ar" ? "حفظ" : "Save"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddCategories;