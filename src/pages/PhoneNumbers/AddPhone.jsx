import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

const AddPhone = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [excelSheet, setExcelsheet] = useState(null);
  const [phone, setphone] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // Fetch data when cardhomeId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = async () => {
    if (!excelSheet) {
      setAlert({
        open: true,
        message:
          lang === "ar" ? "الرجاء اضافة ملف اكسيل" : "Please Add Excel sheet!",
        severity: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", excelSheet);

    try {
      const response = await axios.post(`${API_URL}/phone/add/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setphone(response.data);
      setAlert({
        open: true,
        message: lang === "ar" ? "تمت الاضافة بنجاح" : "Added successfully!",
        severity: "success",
      });

      setTimeout(() => navigate(`/${lang}/phone`), 1500);
    } catch (error) {
      const message =
        error.response?.status === 409
          ? `${
              lang === "ar"
                ? "بعض أرقام الهواتف لم تتم إضافتها:"
                : "Some phone numbers were not added:"
            } ${error.response.data.duplicates.join(", ")}`
          : lang === "ar"
          ? "حدث خطأ، يرجى المحاولة مرة أخرى"
          : "An error occurred, please try again";

      setAlert({ open: true, message, severity: "error" });
    }
  };

  
  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "اضافة رقم هاتف" : "Add Phone Number"}
        subtitle={lang === "ar" ? "بيانات الهاتف" : "List of Phone Numbers"}
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
        // validationSchema={checkoutSchema}
        initialValues={{
          excelSheet: null,
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
                sx={{ gridColumn: "span 4", paddingTop: "20px" }}
                label={lang === "ar" ? "ملف اكسيل" : "upload excel sheet"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 18 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                variant="outlined"
                type="file"
                onChange={(e) => setExcelsheet(e.target.files[0])}
              />
            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {lang === "ar" ? "اضافة" : " Add "}
              </Button>
            </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// const checkoutSchema = yup.object().shape({
//   excelSheet: yup.string().required("excel sheet is required"),
//   // location: yup.string().required("Location is required"),
//   // occu: yup.string().required("Occupation is required"),
// });
const checkoutSchema = yup.object().shape({
  excelSheet: yup.mixed().required("Excel sheet is required"),
});

export default AddPhone;
