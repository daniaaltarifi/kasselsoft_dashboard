import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

const AddPosition = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [position, setposition] = useState([]);
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
            `${API_URL}/position/add`,
            { position_name: values.position_name },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          
      setposition(response.data);
      setAlert({
        open: true,
        message: lang === "ar" ? "تمت الاضافة بنجاح" : "Added successful!",
        severity: "success",
      });

      setTimeout(() => {
        navigate(`/${lang}/career`);
      }, 1500);
    } catch (error) {
      console.log(`Error fetching post data ${error}`);
    }
  };

 

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "اضافة وظيفة" : "Add Position"}
        subtitle={lang === "ar" ? "بيانات وظيفة" : "List of position"}
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
          position_name: position.position_name || "",
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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4",marginTop: "10px"},
              }}
            >
             

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={lang === "ar" ? "اسم الوظيفة" : "position_name"}
                InputLabelProps={{
                    sx: {
                      textAlign: lang === "ar" ? "right" : "left",
                      right: lang === "ar" ? 15 : 'auto',
                      left: lang === "ar" ? 'auto' : 0,
                    },
                  }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.position_name} // Correct usage of Formik values
                name="position_name"
                error={!!touched.position_name && !!errors.position_name}
                helperText={touched.position_name && errors.position_name}
                sx={{ gridColumn: "span 2" }}
                multiline
                rows={4}
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
  position_name: yup.string().required("position_name is required"),
});

export default AddPosition;
