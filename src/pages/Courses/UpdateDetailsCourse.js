import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

const UpdateDetailsCourse = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [img, setImg] = useState(null);
  const [detailsCourseId, setdetailsCourseId] = useState("");
  const [detailsCourse, setdetailsCourse] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Fetch data when detailsCourseId changes
  useEffect(() => {
    if (detailsCourseId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/DetailsCourse/getDetails/${detailsCourseId}`
          );
          setdetailsCourse(response.data);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      fetchData();
    }
  }, [detailsCourseId]);

  // Set detailsCourseId from location state
  useEffect(() => {
    if (location.state && location.state.id) {
      setdetailsCourseId(location.state.id);
    } else {
      console.warn("No ID found in location.state");
    }
  }, [location.state]);

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("Explanations", values.Explanations);
      if (img) {
        formData.append("Videos", img);
      }

      await axios.put(
        `${API_URL}/DetailsCourse/updateDetails/${detailsCourseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAlert({
        open: true,
        message: lang === "ar" ? "تم التعديل بنجاح" : "Update successful!",
        severity: "success",
      });

      setTimeout(() => {
        navigate(`/${lang}/courses`);
      }, 2000);
    } catch (error) {
      console.error(`Error in fetch edit data: ${error}`);
      setAlert({
        open: true,
        message: "Update failed. Please try again.",
        severity: "error",
      });
    }
  };

  const handleVideo = (e) => {
    setImg(e.target.files[0]);
  };

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "تعديل الدورة" : "UPDATE course details "}
        subtitle={
          lang === "ar"
            ? "تعديل بيانات الدورة"
            : "Update an Existing course details"
        }
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
        enableReinitialize={true} // Important to reinitialize when detailsCourse changes
        initialValues={{
          Explanations: detailsCourse?.Explanations || "",
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
                rows={8}
                multiline
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Explanations} // Correct usage of Formik values
                name="Explanations"
                error={!!touched.Explanations && !!errors.Explanations}
                helperText={touched.Explanations && errors.Explanations}
                sx={{ gridColumn: "span 2" }}
              />

              {/* <TextField
                sx={{ gridColumn: "span 4",paddingTop:"20px" }}
                label={lang ==="ar" ? "الفيديو": "Video"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 18 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                variant="outlined"
                type="file"
                onChange={handleVideo}
              /> */}
              <Button
                variant="contained"
                color="primary"
                component="label"
                sx={{
                  marginTop: "10px",
                  backgroundColor: "#FFF",
                  color: "#000",
                  "&:hover": { backgroundColor: "#1e88e5" },
                }}
              >
                Upload Video
                <input
                  type="file"
                  accept="video/mp4"
                  hidden
                  onChange={handleVideo}
                />
              </Button>

              {img && <p>Selected Video: {img.name}</p>}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {lang === "ar" ? "تعديل" : " Update "}
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
});

export default UpdateDetailsCourse;
