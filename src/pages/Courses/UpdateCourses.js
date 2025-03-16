import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from '@mui/material/Alert';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
const UpdateCourses = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [img, setImg] = useState(null);
  const [coursesId, setcoursesId] = useState("");
  const [courses, setcourses] = useState({});
  const [categories, setCategories] = useState([]);

  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  useEffect(() => {
    window.scrollTo(0, 0);
    }, []);
  // Fetch data when coursesId changes
  useEffect(() => {
    if (coursesId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_URL}/courses/getCoursesById/${coursesId}`);
          setcourses(response.data);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      fetchData();
    }
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/categories/Allcategories/en`
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, [coursesId]);

  // Set coursesId from location state
  useEffect(() => {
    if (location.state && location.state.id) {
      setcoursesId(location.state.id);
    } else {
      console.warn('No ID found in location.state');
    }
  }, [location.state]);

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("category_id", values.category_id);
      formData.append("lang", lang);

      if (img) {
        formData.append("image", img);
      }

      await axios.put(
        `${API_URL}/courses/updateCourse/${coursesId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAlert({ open: true, message: lang === 'ar' ? "تم التعديل بنجاح":"Update successful!", severity: "success" });

      setTimeout(() => {
        navigate(`/${lang}/courses`);
      }, 2000);

    } catch (error) {
      console.error(`Error in fetch edit data: ${error}`);
      setAlert({ open: true, message: "Update failed. Please try again.", severity: "error" });
    }
  };

  const handleImg = (e) => {
    setImg(e.target.files[0]);
  };

  return (
    <Box m="20px">
      <Header title={lang ==="ar" ? "تعديل الدورة" :"UPDATE Course "} subtitle={lang ==="ar" ? "تعديل بيانات الدورة" : "Update an Existing Course"} />

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
        enableReinitialize={true} // Important to reinitialize when courses changes
        initialValues={{
          title: courses?.title || "",
          description: courses?.description || "",
          category_id: courses?.category_id || "",
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
             
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4",marginTop:"10px" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label=
                {lang ==="ar" ? "العنوان" :"Title"} 
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
                label=               {lang ==="ar" ? "الوصف" :"Description" } 
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
                // sx={{ gridColumn: "span 2" }}
                multiline
                rows={8}
              />
              <FormControl
                fullWidth
                variant="filled"
                error={!!touched.category_id && !!errors.category_id}
                sx={{
                  gridColumn: "span 2",
                  "& .MuiInputLabel-root": {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 45 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                  "& .MuiSelect-select": {
                    textAlign: lang === "ar" ? "right" : "left",
                  },
                }}
              >
                <InputLabel>{lang === "ar" ? "الصنف" : "Category"}</InputLabel>
                <Select
                  label={lang === "ar" ? "الصنف" : "Category"}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={values.category_id}
                  name="category_id"
                >
                  {categories.map((catg) => (
                    <MenuItem key={catg.id} value={catg.id}>
                      {lang === "ar" ? catg.categoryName : catg.categoryName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.category_id && errors.category_id}
                </FormHelperText>
              </FormControl>
              <TextField
                sx={{ gridColumn: "span 4",paddingTop:"20px" }}
                label={lang ==="ar" ? "الصورة": "Img"}
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
              { lang ==="ar" ? "تعديل" :" Update "}
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
  category_id: yup.string().required("Category is required"), // Fix this field name
});

export default UpdateCourses;
