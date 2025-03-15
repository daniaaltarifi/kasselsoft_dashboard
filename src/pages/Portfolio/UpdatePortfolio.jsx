import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

const UpdatePortfolio = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [img, setImg] = useState(null);
  const [portfolioId, setportfolioId] = useState("");
  const [portfolio, setportfolio] = useState({});
  const [getTypes, setGetTypes] = useState([]);
  const [getServicesProvided, setGetServicesProvided] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedServicesProvided, setSelectedServicesProvided] = useState([]);

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
          const [portfolioResponse, getTypesRes, services_providedRes] =
            await Promise.all([
              axios.get(`${API_URL}/portfolio/getbyid/${portfolioId}`),
              axios.get(`${API_URL}/typeofportfolio/${lang}`),
              axios.get(`${API_URL}/portfolioservicessrovided/${lang}`),
            ]);
            console.log("portfolioResponse",portfolioResponse)
          setportfolio(portfolioResponse.data[0]);
          setGetTypes(getTypesRes.data);
          const checkedTypes = portfolioResponse.data[0].types.map(
            (types) => types.type_id
          );
          setSelectedTypes(checkedTypes);
          setGetServicesProvided(services_providedRes.data);
          const checkedServices =
            portfolioResponse.data[0].services_provided.map(
              (service) => service.service_id
            );
          setSelectedServicesProvided(checkedServices);
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
  const handleSelectionChange = (event, setStateFunction, selectedArray) => {
    const { value, checked } = event.target;
    // Convert the value to a number if needed (since value is a string)
    const serviceId = parseInt(value, 10);
    if (checked) {
      setStateFunction((prevSelected) => [...prevSelected, serviceId]); // Add serviceId to the array
    } else {
      setStateFunction(
        (prevSelected) => prevSelected.filter((item) => item !== serviceId) // Remove serviceId from the array
      );
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("link", values.link);
      formData.append("lang", lang);
      formData.append("types", selectedTypes.join(",")); // Ensure types are joined as a comma-separated string
      formData.append("services_provided", selectedServicesProvided.join(","));
      if (img) {
        formData.append("portfolioimg", img);
      }

      await axios.put(
        `${API_URL}/portfolio/update/${lang}/${portfolioId}`,
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

  const handleImg = (e) => {
    setImg(e.target.files[0]);
  };

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "تعديل المشروع" : "UPDATE Portfolio "}
        subtitle={
          lang === "ar"
            ? "تعديل بيانات المشروع"
            : "Update an Existing Portfolio"
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
          title: portfolio.title || "",
          description: portfolio.description || "",
          link: portfolio.link || "",
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
                label={lang === "ar" ? "العنوان" : "Title"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : "auto",
                    left: lang === "ar" ? "auto" : 0,
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
                label={lang === "ar" ? "الوصف" : "Description"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description} // Correct usage of Formik values
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                // sx={{ gridColumn: "span 2" }}
                multiline
                rows={8}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={lang === "ar" ? "الرابط" : "Link"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.link} // Correct usage of Formik values
                name="link"
                error={!!touched.link && !!errors.link}
                helperText={touched.link && errors.link}
                sx={{ gridColumn: "span 2" }}
              />
              <h3>Select Types</h3>

              {getTypes.map((types) => (
                <label key={types.id}>
                  <input
                    type="checkbox"
                    name="types"
                    value={types.id}
                    checked={selectedTypes.includes(types.id)}
                    onChange={(event) =>
                      handleSelectionChange(
                        event,
                        setSelectedTypes,
                        selectedTypes
                      )
                    }
                  />
                  {types.type}
                </label>
              ))}

              <h3>Select Services Provided </h3>
              {getServicesProvided.map((service) => (
                <label key={service.id}>
                  <input
                    type="checkbox"
                    name="services"
                    value={service.id}
                    checked={selectedServicesProvided.includes(service.id)} // Check if the service is in selectedServicesProvided
                    onChange={(event) =>
                      handleSelectionChange(
                        event,
                        setSelectedServicesProvided,
                        selectedServicesProvided
                      )
                    }
                  />
                  {service.title}
                </label>
              ))}

              <br />
              <TextField
                sx={{ gridColumn: "span 4", paddingTop: "20px" }}
                label={lang === "ar" ? "الصورة" : "Image"}
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
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

export default UpdatePortfolio;
