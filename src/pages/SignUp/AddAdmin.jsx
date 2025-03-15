import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

const AddAdmin = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;

  const [admins, setadmins] = useState([]);
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
        `${API_URL}/auth/signup/post`,
        {
          name: values.name,
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Set to application/json
          },
        }
      );
  
      setadmins(response.data);
      setAlert({
        open: true,
        message: lang === "ar" ? "تمت الاضافة بنجاح" : "Added successful!",
        severity: "success",
      });
  
      setTimeout(() => {
        navigate(`/${lang}/users`);
      }, 1500);
    } catch (error) {
      console.log(`Error fetching post data ${error}`);
    }
  };
  
  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "اضافة ادمن" : "Add Admin"}
        subtitle={lang === "ar" ? "بيانات الادمن" : "List of admins"}
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
          name: admins.name || "",
          email: admins.email || "",
          password: admins.password || "",
          confirmpassword: admins.confirmpassword || "",
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
                label={lang === "ar" ? "الاسم" : "Name"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name} // Correct usage of Formik values
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={lang === "ar" ? "البريد الالكتروني" : "Email"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email} // Correct usage of Formik values
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label={lang === "ar" ? "كلمة السر" : "Password"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password} // Correct usage of Formik values
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label={lang === "ar" ? " تأكيد كلمة السر " : "Confirm password"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmpassword} // Correct usage of Formik values
                name="confirmpassword"
                error={!!touched.confirmpassword && !!errors.confirmpassword}
                helperText={touched.confirmpassword && errors.confirmpassword}
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
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default AddAdmin;
