import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

const AddPortfolio = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [img, setImg] = useState(null);

  const [portfolio, setportfolio] = useState([]);
  const [getTypes, setGetTypes] = useState([]);
  const [getServicesProvided, setGetServicesProvided] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedServicesProvided, setSelectedServicesProvided] = useState([]);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // Fetch data when cardhomeId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [getTypesRes,services_providedRes] = await Promise.all ([
            axios.get(`${API_URL}/typeofportfolio/${lang}`),
            axios.get(`${API_URL}/portfolioservicessrovided/${lang}`),
        ])
        setGetTypes(getTypesRes.data);
        setGetServicesProvided(services_providedRes.data)
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [lang]);
  const handleSelectionChange = (event, setStateFunction, selectedArray) => {
    const { value, checked } = event.target;
    
    if (checked) {
      setStateFunction((prevSelected) => [...prevSelected, value]);
    } else {
      setStateFunction((prevSelected) =>
        prevSelected.filter((item) => item !== value)
      );
    }
    
    console.log("Selected Values:", selectedArray); // Log the selected array (you can adjust this as needed)
  };
  
  const handleFormSubmit = async (values) => {
    if (!img) {
      setAlert({
        open: true,
        message: lang === "ar" ? "الرجاء اضافة صورة" : "Please Add img !",
        severity: "error",
      });
    }
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("link", values.link);
      formData.append("types", selectedTypes.join(",")); // Ensure types are joined as a comma-separated string
      formData.append("services_provided", selectedServicesProvided.join(",")); // Same for services
      formData.append("portfolioimg", img);
  
      console.log("Form Data Being Sent: ", formData);
  
      const response = await axios.post(
        `${API_URL}/portfolio/add/${lang}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      setportfolio(response.data);
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
  

  const handleImg = (e) => {
    setImg(e.target.files[0]);
  };

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "اضافة المشاريع" : "Add portfolio"}
        subtitle={lang === "ar" ? "بيانات المشاريع" : "List of portfolio"}
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
          title: portfolio.title || "",
          description: portfolio.description || "",
          link: portfolio.link || "",
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
                sx={{ gridColumn: "span 2" }}
                multiline
                rows={8}
              />
              <TextField
                fullWidth
                variant="filled"
                type="url"
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
              />
              <h3>{lang === 'ar' ? ' اختر نوع المشروع' : 'Select Types of Project '}</h3>
              {getTypes.map((types) => (
                <label key={types.id}>
                  <input
                    type="checkbox"
                    name="type"
                    value={types.id}
                    onChange={(event) => handleSelectionChange(event, setSelectedTypes, selectedTypes)}
                    />
                  {types.type}
                </label>
              ))}
              <h3> {lang === 'ar' ? 'اختيار الخدمات المقدمة ' : 'Select Services Provided'}</h3>
              {getServicesProvided.map((service) => (
                <label key={service.id}>
                  <input
                    type="checkbox"
                    name="services"
                    value={service.id}
                    onChange={(event) => handleSelectionChange(event, setSelectedServicesProvided, selectedServicesProvided)}
                    />
                  {service.title}
                </label>
              ))}
              <br/>
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
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  // link: yup.string().required("Link is required"),
});

export default AddPortfolio;
