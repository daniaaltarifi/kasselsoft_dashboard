import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
const AddCourses = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [img, setImg] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category_id, setCategory_id] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [addedCourseId, setAddedCourseId] = useState(null);
  
  const [courses, setcourses] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // Fetch data when cardhomeId changes
  useEffect(() => {
    window.scrollTo(0, 0);
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
      formData.append("category_id", values.category_id);
      formData.append("image", img);
      formData.append("lang", lang);
      const response = await axios.post(
        `${API_URL}/courses/addCourse`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setcourses(response.data);
      const newCourseId = response.data.id;
      setAlert({
        open: true,
        message: lang === "ar" ? "تمت الاضافة بنجاح" : "Added successful!",
        severity: "success",
      });
      setTimeout(() => {
        setOpenDialog(true);
        setAddedCourseId(newCourseId); // Store the course ID
      }, 1000);
      // setTimeout(() => {
      //   navigate(`/${lang}/courses`);
      // }, 1500);
    } catch (error) {
      console.log(`Error fetching post data ${error}`);
    }
  };

  const handleImg = (e) => {
    setImg(e.target.files[0]);
  };

  const handleNavigate = (addDetails) => {
    setOpenDialog(false);
    if (addDetails) {
      navigate(`/${lang}/add-course-details/${addedCourseId}`); // Redirect to video & explanation form
    } else {
      navigate(`/${lang}/courses`); // Redirect to course list
    }
  };
  
  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "اضافة دورة" : "Add Course"}
        subtitle={lang === "ar" ? "بيانات الخدمات" : "List of courses"}
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
          title: courses.title || "",
          description: courses.description || "",
          category_id: courses.category_id || "",
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
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                  marginTop: "10px",
                },
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
                    right: lang === "ar" ? 15 : "auto",
                    left: lang === "ar" ? "auto" : 0,
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
                    right: lang === "ar" ? 15 : "auto",
                    left: lang === "ar" ? "auto" : 0,
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
                sx={{ gridColumn: "span 4", paddingTop: "20px" }}
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
      <Dialog open={openDialog} onClose={() => handleNavigate(false)}>
        <DialogTitle>
          {lang === "ar" ? "إضافة تفاصيل الدورة؟" : "Add Course Details?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {lang === "ar"
              ? "هل تريد إضافة فيديو وشرح لهذه الدورة الآن؟"
              : "Do you want to add a video and explanation for this course now?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleNavigate(false)} color="primary">
            {lang === "ar" ? "تخطي" : "Skip"}
          </Button>
          <Button onClick={() => handleNavigate(true)} color="secondary">
            {lang === "ar" ? "نعم، أضف التفاصيل" : "Yes, Add Details"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  category_id: yup.string().required("Category is required"), // Fix this field name
});

export default AddCourses;
