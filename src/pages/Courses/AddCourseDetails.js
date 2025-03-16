import { Box, Button, TextField, Alert } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddCourseDetails = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { course_id, lang } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [explanation, setExplanation] = useState("");
  const [video, setVideo] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = async () => {
    if (!explanation || !video) {
      setAlert({
        open: true,
        message:
          lang === "ar"
            ? "الرجاء إدخال الشرح وإضافة فيديو"
            : "Please enter explanation and add a video!",
        severity: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("Explanations", explanation);
    formData.append("Videos", video);
    formData.append("course_id", course_id);

    try {
      await axios.post(`${API_URL}/DetailsCourse/addDetails`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAlert({
        open: true,
        message: lang === "ar" ? "تمت الإضافة بنجاح" : "Added successfully!",
        severity: "success",
      });

      // Reset form for new entry
      setExplanation("");
      setVideo(null);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "إضافة تفاصيل الدورة" : "Add Course Details"}
        subtitle={lang === "ar" ? "بيانات الدورة" : "List of course details"}
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
            "& .MuiAlert-message": { fontWeight: "bold" },
          }}
          onClose={() => setAlert({ ...alert, open: false })}
        >
          {alert.message}
        </Alert>
      )}

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
          label={lang === "ar" ? "الشرح" : "Explanation"}
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        />
        <Button
        variant="contained"
        color="primary"
        component="label"
        sx={{ marginTop: "10px", backgroundColor: "#FFF",color:"#000","&:hover": { backgroundColor: "#1e88e5" } }}
      >
        Upload Video
        <input
          type="file"
          accept="video/mp4"
          hidden
          onChange={(e) => setVideo(e.target.files[0])}
        />
      </Button>

      {video && <p>Selected Video: {video.name}</p>}
    
      </Box>

      <Box display="flex" justifyContent="space-between" mt="20px">
        <Button
          color="secondary"
          variant="contained"
          onClick={handleFormSubmit}
        >
          {lang === "ar" ? "إضافة" : "Add"}
        </Button>
        <Button
          color="primary"
          sx={{
            backgroundColor: "#2196f3",
            color: "#fff",
            "&:hover": { backgroundColor: "#1e88e5" },
          }}
          onClick={() => navigate(`/${lang}/courses`)}
        >
          {lang === "ar" ? "إنهاء" : "Finish"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddCourseDetails;
