import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

const AddTypeOfPortfolio = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const [getTypes, setGetTypes] = useState([]);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // Fetch data when cardhomeId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      await axios.post(`${API_URL}/typeofportfolio/add/${lang}`,{"type":values.type}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAlert({
        open: true,
        message: lang === "ar" ? "تمت الاضافة بنجاح" : "Added successful!",
        severity: "success",
      });

      setTimeout(() => {
        navigate(`/${lang}/portfolio`);
      }, 1500);
    } catch (error) {
      console.log(`Error fetching post data ${error}`);
    }
  };

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "اضافة نوع مشروع" : "Add portfolio"}
        subtitle={lang === "ar" ? "بيانات نوع مشروع" : "List of portfolio"}
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
          type: getTypes.type || "",
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
                label={lang === "ar" ? "نوع المشروع" : "Type"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.type} // Correct usage of Formik values
                name="type"
                error={!!touched.type && !!errors.type}
                helperText={touched.type && errors.type}
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
  type: yup.string().required("type is required"),
});

export default AddTypeOfPortfolio;
