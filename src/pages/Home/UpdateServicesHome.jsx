import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from '@mui/material/Alert';

const UpdateServicesHome = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [img, setImg] = useState(null);
  const [mainhomeId, setMainhomeId] = useState("");
  const [mainHome, setMainHome] = useState({});
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  // Fetch data when mainhomeId changes
  useEffect(() => {
    window.scrollTo(0, 0);
    if (mainhomeId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_URL}/homeservices/getbyid/${mainhomeId}`);
          setMainHome(response.data[0]);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      fetchData();
    }
  }, [mainhomeId]);

  // Set mainhomeId from location state
  useEffect(() => {
    if (location.state && location.state.id) {
      setMainhomeId(location.state.id);
    } else {
      console.warn('No ID found in location.state');
    }
  }, [location.state]);

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      if (img) {
        formData.append("img", img);
      }

      await axios.put(
        `${API_URL}/homeservices/update/${lang}/${mainhomeId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAlert({ open: true, message: lang === 'ar' ? "تم التعديل بنجاح":"Update successful!", severity: "success" });

      setTimeout(() => {
        navigate(`/${lang}/home`);
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
      <Header title={lang ==="ar" ? "تعديل الخدمات" :"UPDATE Services HOME"} subtitle={lang ==="ar" ? "تعديل بيانات الخدمات" : "Update an Existing Services Home"} />

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
        enableReinitialize={true} // Important to reinitialize when mainHome changes
        initialValues={{
          title: mainHome.title || "",
          description: mainHome.description || "",
          button: mainHome.button || "",
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
                sx={{ gridColumn: "span 4" }}
                multiline
                rows={6}
              />
             
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
});

export default UpdateServicesHome;
