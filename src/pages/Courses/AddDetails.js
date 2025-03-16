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
const AddDetails = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [img, setImg] = useState(null);
  const [courses, setcourses] = useState([]);
  const [category_id, setCategory_id] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [addedCourseId, setAddedCourseId] = useState(null);
  
  const [detailscourses, setdetailscourses] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // Fetch data when cardhomeId changes
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchcourses = async () => {
      try {
        const response = await axios.get(`${API_URL}/courses/Allcourses/en`
        );
        setcourses(response.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchcourses();
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
      formData.append("Explanations", values.Explanations);
      formData.append("course_id", values.course_id);
      formData.append("Videos", img);
      const response = await axios.post(
        `${API_URL}/DetailsCourse/addDetails`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setdetailscourses(response.data);
      setAlert({
        open: true,
        message: lang === "ar" ? "تمت الاضافة بنجاح" : "Added successful!",
        severity: "success",
      });

      setTimeout(() => {
        navigate(`/${lang}/courses`);
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
        title={lang === "ar" ? "اضافة دورة" : "Add Course"}
        subtitle={lang === "ar" ? "بيانات الخدمات" : "List of detailscourses"}
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
          Explanations: detailscourses.Explanations || "",
          course_id: detailscourses.course_id || "",
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
                label={lang === "ar" ? "الشرح" : "Explanations"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                rows={10}
                multiline
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Explanations} // Correct usage of Formik values
                name="Explanations"
                error={!!touched.Explanations && !!errors.Explanations}
                helperText={touched.Explanations && errors.Explanations}
              />
              <FormControl
                fullWidth
                variant="filled"
                error={!!touched.course_id && !!errors.course_id}
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
                <InputLabel>{lang === "ar" ? "الدورة" : "course"}</InputLabel>
                <Select
                  label={lang === "ar" ? "الدورة" : "course"}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={values.course_id}
                  name="course_id"
                >
                  {courses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      {lang === "ar" ? course.title : course.title}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.course_id && errors.course_id}
                </FormHelperText>
              </FormControl>
              <TextField
                sx={{ gridColumn: "span 4", paddingTop: "20px" }}
                label={lang === "ar" ? "الفيديو" : "Video"}
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
  Explanations: yup.string().required("Explanations is required"),
  course_id: yup.string().required("course_id is required"), // Fix this field name
});

export default AddDetails;
