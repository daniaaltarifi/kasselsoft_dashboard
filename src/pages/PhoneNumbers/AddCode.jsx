import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

const AddCode = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;

  const [codes, setcodes] = useState([]);
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
      const response = await axios.post(
        `${API_URL}/codes/add`,
        {
          code: values.code,
          exp_date: values.exp_date,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setcodes(response.data);
      setAlert({
        open: true,
        message: lang === "ar" ? "تمت الاضافة بنجاح" : "Added successful!",
        severity: "success",
      });

      setTimeout(() => {
        navigate(`/${lang}/phone`);
      }, 1500);
    } catch (error) {
      console.log(`Error fetching post data ${error}`);
    }
  };

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "اضافة كود" : "Add Code"}
        subtitle={lang === "ar" ? "بيانات الكود" : "List of codes"}
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
          code: codes.title || "",
          exp_date: codes.exp_date || "",
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
                label={lang === "ar" ? "الكود" : "Code"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                sx={{ gridColumn: "span 2" }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.code} // Correct usage of Formik values
                name="code"
                error={!!touched.code && !!errors.code}
                helperText={touched.code && errors.code}
              />
              <br />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label={lang === "ar" ? "تاريخ الانتهاء" : "Expiry Date"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                InputProps={{
                  sx: {
                    marginTop: "8px", // Adjust the margin as needed
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.exp_date} // Correct usage of Formik values
                name="exp_date"
                error={!!touched.exp_date && !!errors.exp_date}
                helperText={touched.exp_date && errors.exp_date}
                sx={{ gridColumn: "span 2" }}
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
  code: yup.string().required("Code is required"),
  exp_date: yup.string().required("Expiry Date is required"),
});

export default AddCode;
