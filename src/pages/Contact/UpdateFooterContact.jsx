import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

const UpdateFooterContact = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [img, setImg] = useState(null);
  const [footercontactId, setfootercontactId] = useState("");
  const [footercontact, setfootercontact] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Fetch data when footercontactId changes
  useEffect(() => {
    if (footercontactId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/footer/getbyid/${footercontactId}`
          );
          setfootercontact(response.data[0]);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      fetchData();
    }
  }, [footercontactId]);

  // Set footercontactId from location state
  useEffect(() => {
    if (location.state && location.state.id) {
      setfootercontactId(location.state.id);
    } else {
      console.warn("No ID found in location.state");
    }
  }, [location.state]);

  const handleFormSubmit = async (values) => {
    try {
      // Prepare the data as a plain object
      const dataToUpdate = {
        logo: values.logo,
        description: values.description,
        support: values.support,
        terms: values.terms,
        terms_link: values.terms_link,
        privacy: values.privacy,
        privacy_link: values.privacy_link,
        contact: values.contact,
        contact_link: values.contact_link,
        company: values.company,
        home: values.home,
        services: values.services,
        services_link: values.services_link,
        about: values.about,
        about_link: values.about_link,
        career: values.career,
        career_link: values.career_link,
      };

      await axios.put(
        `${API_URL}/footer/update/${lang}/${footercontactId}`,
        dataToUpdate, // Send the plain object
        {
          headers: {
            "Content-Type": "application/json", // Set content type to application/json
          },
        }
      );

      setAlert({
        open: true,
        message: lang === "ar" ? "تم التعديل بنجاح" : "Update successful!",
        severity: "success",
      });

      setTimeout(() => {
        navigate(`/${lang}/infContact`);
      }, 1000);
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
        title={lang === "ar" ? "تعديل التواصل" : " Update FooterContact"}
        subtitle={
          lang === "ar"
            ? "تعديل بيانات التواصل"
            : "Update List of FooterContact"
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
        enableReinitialize={true} // Important to reinitialize when footercontact changes
        const
        initialValues={{
          logo: footercontact.logo || "",
          description: footercontact.description || "",
          support: footercontact.support || "",
          terms: footercontact.terms || "",
          terms_link: footercontact.terms_link || "",
          privacy: footercontact.privacy || "",
          privacy_link: footercontact.privacy_link || "",
          contact: footercontact.contact || "",
          contact_link: footercontact.contact_link || "",
          company: footercontact.company || "",
          home: footercontact.home || "",
          services: footercontact.services || "",
          services_link: footercontact.services_link || "",
          about: footercontact.about || "",
          about_link: footercontact.about_link || "",
          career: footercontact.career || "",
          career_link: footercontact.career_link || "",
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
              {/* {errors && Object.keys(errors).length > 0 && (
  <div>
    {Object.keys(errors).map((key) => (
      <div key={key}>{errors[key]}</div>
    ))}
  </div>
)} */}

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={lang === "ar" ? "الشعار" : "Logo"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.logo} // Correct usage of Formik values
                name="logo"
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
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description} // Correct usage of Formik values
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
                multiline
                rows={5}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={lang === "ar" ? "العنوان" : "support"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.support} // Correct usage of Formik values
                name="support"
                error={!!touched.support && !!errors.support}
                helperText={touched.support && errors.support}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label={lang === "ar" ? "الشروط" : "Terms"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                name="terms"
                value={values.terms}
                onChange={handleChange}
                variant="filled"
              />
              <TextField
                label={lang === "ar" ? "رابط الشروط" : "Terms Link"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                name="terms_link"
                value={values.terms_link}
                onChange={handleChange}
                variant="filled"
              />
              <TextField
                label={lang === "ar" ? "سياسة الخصوصية" : "Privacy"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                name="privacy"
                value={values.privacy}
                onChange={handleChange}
                variant="filled"
              />
              <TextField
                label={lang === "ar" ? "رابط سياسة الخصوصية" : "Privacy Link"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                name="privacy_link"
                value={values.privacy_link}
                onChange={handleChange}
                variant="filled"
              />
              <TextField
                label={lang === "ar" ? "التواصل" : "Contact"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                name="contact"
                value={values.contact}
                onChange={handleChange}
                variant="filled"
              />
              <TextField
                label={lang === "ar" ? "رابط التواصل" : "Contact Link"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                name="contact_link"
                value={values.contact_link}
                onChange={handleChange}
                variant="filled"
              />
              <TextField
                label={lang === "ar" ? "الشركة" : "Company"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                name="company"
                value={values.company}
                onChange={handleChange}
                variant="filled"
              />
              <TextField
                label={lang === "ar" ? "الرئيسية" : "Home"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                name="home"
                value={values.home}
                onChange={handleChange}
                variant="filled"
              />
              <TextField
                label={lang === "ar" ? "الخدمات" : "Services"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                name="services"
                value={values.services}
                onChange={handleChange}
                variant="filled"
              />
              <TextField
                label={lang === "ar" ? "رابط الخدمات" : "Services Link"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                name="services_link"
                value={values.services_link}
                onChange={handleChange}
                variant="filled"
              />
              <TextField
                label={lang === "ar" ? "حول" : "About"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                name="about"
                value={values.about}
                onChange={handleChange}
                variant="filled"
              />
              <TextField
                label={lang === "ar" ? "رابط حول" : "About Link"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                name="about_link"
                value={values.about_link}
                onChange={handleChange}
                variant="filled"
              />
              <TextField
                label={lang === "ar" ? "وظائف" : "Career"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                name="career"
                value={values.career}
                onChange={handleChange}
                variant="filled"
              />
              <TextField
                label={lang === "ar" ? "رابط الوظائف" : "Career Link"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                  },
                }}
                name="career_link"
                value={values.career_link}
                onChange={handleChange}
                variant="filled"
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
  logo: yup.string().required("logo is required"),
  description: yup.string().required("Description is required"),
  support: yup.string().required("Support link is required"),
  terms: yup.string().required("Terms are required"),
  terms_link: yup.string().required("Terms link is required"),
  privacy: yup.string().required("Privacy policy is required"),
  privacy_link: yup.string().required("Privacy link is required"),
  contact: yup.string().required("Contact information is required"),
  contact_link: yup.string().required("Contact link is required"),
  company: yup.string().required("Company information is required"),
  home: yup.string().required("Home link is required"),
  services: yup.string().required("Services information is required"),
  services_link: yup.string().required("Services link is required"),
  about: yup.string().required("About information is required"),
  about_link: yup.string().required("About link is required"),
  career: yup.string().required("Career information is required"),
  career_link: yup.string().required("Career link is required"),
});

export default UpdateFooterContact;
