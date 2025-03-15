import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const UpdateCategories = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams();  // فقط جلب id الآن
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [category, setCategory] = useState(null);

  
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/categories/getcategoriesById/${id}`);
        setCategory(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching category:", error);
        setAlert({
          open: true,
          message: "Error fetching category",  // إزالة استخدام lang هنا
          severity: "error",
        });
      }
    };
    fetchCategory();
  }, [id]);

  const handleFormSubmit = async (values) => {
    try {
      await axios.put(`${API_URL}/categories/updateCategory/${id}`, {
        categoryName: values.categoryName,
        lang: values.lang
      });

      setAlert({
        open: true,
        message: "Category updated successfully!",  // إزالة استخدام lang هنا
        severity: "success",
      });

      setTimeout(() => {
        navigate("/categories");  // تعديل المسار هنا
      }, 1500);
    } catch (error) {
      setAlert({
        open: true,
        message: "Error updating category",  // إزالة استخدام lang هنا
        severity: "error",
      });
      console.error("Error updating category:", error);
    }
  };

  const checkoutSchema = yup.object().shape({
    categoryName: yup.string().required("Required"),  // إزالة استخدام lang هنا
    lang: yup.string().required("Required")
  });

  if (!category) return <div>Loading...</div>;

  return (
    <Box m="20px">
      <Header
        title="Update Category"  // إزالة استخدام lang هنا
        subtitle="Update Category Details"  // إزالة استخدام lang هنا
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
          categoryName: category.categoryName,
          lang: category.lang
        }}
        enableReinitialize
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
                label="Category Name"  // إزالة استخدام lang هنا
                InputLabelProps={{
                  sx: {
                    textAlign: "left",
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
                <InputLabel id="lang-label">Language</InputLabel>  
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
                Save Changes  
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UpdateCategories;
