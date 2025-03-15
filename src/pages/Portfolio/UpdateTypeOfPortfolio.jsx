import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

const UpdateTypeOfPortfolio = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [portfolioId, setportfolioId] = useState("");
  const [getTypes, setGetTypes] = useState({});

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Fetch data when portfolioId changes
  useEffect(() => {
    if (portfolioId) {
        const fetchData = async () => {
            try {
              const response = await axios.get(`${API_URL}/typeofportfolio/getbyid/${lang}/${portfolioId}`);
              setGetTypes(response.data[0]);
            } catch (err) {
              console.error("Error fetching data:", err);
            }
          };
          fetchData();
        }
  }, [portfolioId]);

  // Set portfolioId from location state
  useEffect(() => {
    if (location.state && location.state.id) {
      setportfolioId(location.state.id);

    } else {
      console.warn("No ID found in location.state");
    }
  }, [location.state]);
  const handleFormSubmit = async (values) => {
    try {
      await axios.put(
        `${API_URL}/typeofportfolio/update/${lang}/${portfolioId}`,
       { "type":values.type},
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
        navigate(`/${lang}/portfolio`);
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

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "تعديل نوع المشروع" : "UPDATE Type Of Portfolio "}
        subtitle={
          lang === "ar"
            ? "تعديل بيانات نوع المشروع"
            : "Update an Existing Type Of Portfolio"
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
        enableReinitialize={true} // Important to reinitialize when portfolio changes
        initialValues={{
            type: getTypes.type || "",
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
                label={lang === "ar" ? "نوع المشروع " : "type"}
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
    type: yup.string().required("type is required"),
});

export default UpdateTypeOfPortfolio;
