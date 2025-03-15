import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from '@mui/material/Alert';

const UpdateAbout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [aboutId, setaboutId] = useState("");
  const [about, setabout] = useState({});
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  // Fetch data when aboutId changes
  useEffect(() => {
    window.scrollTo(0, 0);

    if (aboutId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/aboutbyid/${aboutId}`);
          setabout(response.data[0]);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      fetchData();
    }
  }, [aboutId]);

  // Set aboutId from location state
  useEffect(() => {
    if (location.state && location.state.id) {
      setaboutId(location.state.id);
    } else {
      console.warn('No ID found in location.state');
    }
  }, [location.state]);

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("point1", values.point1);
      formData.append("point2", values.point2);
      formData.append("point3", values.point3);
      if (image1) {
        formData.append("image1", image1);
      }
      if (image2) {
        formData.append("image2", image2);
      }
      await axios.put(
        `${API_URL}/api/update/${lang}/${aboutId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAlert({ open: true, message: lang === 'ar' ? "تم التعديل بنجاح":"Update successful!", severity: "success" });

      setTimeout(() => {
        navigate(`/${lang}/about`);
      }, 2000);

    } catch (error) {
      console.error(`Error in fetch edit data: ${error}`);
      setAlert({ open: true, message: "Update failed. Please try again.", severity: "error" });
    }
  };

  const handleImg1 = (e) => {
    setImage1(e.target.files[0]);
  };
  const handleImg2 = (e) => {
    setImage2(e.target.files[0]);
  };
  return (
    <Box m="20px">
      <Header title={lang ==="ar" ? "تعديل عن كاسل" :"UPDATE About "} subtitle={lang ==="ar" ? "تعديل بيانات عن كاسل" : "Update an Existing About"} />

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
        enableReinitialize={true} // Important to reinitialize when about changes
        initialValues={{
          point1: about.point1 || "",
          point2: about.point2 || "",
          point3: about.point3 || "",
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
                {lang ==="ar" ? "فقرة 1" :"Paragraph 1"} 
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.point1} // Correct usage of Formik values
                name="point1"
                error={!!touched.point1 && !!errors.point1}
                helperText={touched.point1 && errors.point1}
                sx={{ gridColumn: "span 2" }}
              />
             
             <TextField
                fullWidth
                variant="filled"
                type="text"
                label=
                {lang ==="ar" ? "فقرة 2" :"Paragraph 2"} 
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.point2} // Correct usage of Formik values
                name="point2"
                error={!!touched.point2 && !!errors.point2}
                helperText={touched.point2 && errors.point2}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label=
                {lang ==="ar" ? "فقرة 3" :"Paragraph 3"} 
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.point3} // Correct usage of Formik values
                name="point3"
                error={!!touched.point3 && !!errors.point3}
                helperText={touched.point3 && errors.point3}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                sx={{ gridColumn: "span 4",paddingTop:"20px" }}
                label={lang ==="ar" ? "الصورة 1": "image 1"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 18 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                variant="outlined"
                type="file"
                onChange={handleImg1}
              />
               <TextField
                sx={{ gridColumn: "span 4",paddingTop:"20px" }}
                label={lang ==="ar" ? " الصورة 2": "image 2"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 18 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                variant="outlined"
                type="file"
                onChange={handleImg2}
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
    point1: yup.string().required("point1 is required"),
    point2: yup.string().required("point2 is required"),
    point3: yup.string().required("point3 is required"),

});

export default UpdateAbout;
