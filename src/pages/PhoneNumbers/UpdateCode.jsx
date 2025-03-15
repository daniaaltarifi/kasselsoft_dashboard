import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

const UpdateCode = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [codeId, setcodeId] = useState("");
  const [codes, setcodes] = useState({}); // Default initialization
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Fetch data when codeId changes
  useEffect(() => {
    if (codeId) {
      console.log("codeId changed", codeId);
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/codes/getbyid/${codeId}`
          );
          const fetchedDate = new Date(response.data.exp_date);
          const localDate = fetchedDate.toLocaleDateString("en-CA"); // Format to YYYY-MM-DD for input
          setcodes({ ...response.data, exp_date: localDate });
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };

      fetchData();
    }
  }, [codeId]);

  // Set codeId from location state
  useEffect(() => {
    if (location.state && location.state.id) {
      setcodeId(location.state.id);
      console.log(location.state.id);
    } else {
      console.warn("No ID found in location.state");
    }
  }, [location.state]);

  const handleFormSubmit = async (values) => {
    try {
      await axios.put(
        `${API_URL}/codes/update/${codeId}`,
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
      setAlert({
        open: true,
        message: lang === "ar" ? "تم التعديل بنجاح" : "Update successful!",
        severity: "success",
      });
      setTimeout(() => {
        navigate(`/${lang}/phone`);
      }, 1500);
    } catch (error) {
      console.error("Error updating data:", error);
      setAlert({
        open: true,
        message: "Update failed. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "تعديل  كود" : "UPDATE Code"}
        subtitle={lang === "ar" ? "تعديل كود " : "Update an Existing Code"}
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
        enableReinitialize={true} // Important to reinitialize when codes changes
        initialValues={{
          code: codes.code || "",
          exp_date: codes.exp_date || "",
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
                label={lang === "ar" ? "الكود" : "Code"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.code} // Correct usage of Formik values
                name="code"
                error={!!touched.code && !!errors.code}
                helperText={touched.code && errors.code}
                sx={{ gridColumn: "span 2" }}
              />
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
  code: yup.string().required("Code is required"),
  exp_date: yup.string().required("Expiry Date is required"),
});

export default UpdateCode;
