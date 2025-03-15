import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from '@mui/material/Alert';

const AddIndustryImg = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [img, setImg] = useState(null);

  const [industryimg,setindustryimg]=useState([])
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  // Fetch data when cardhomeId changes
  useEffect(() => {
  window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = async () => {

        if (!img) {
            setAlert({ open: true, message: lang === 'ar' ? "الرجاء اضافة صورة":"Please Add img !", severity: "error" });

        }
        try {
          const formData = new FormData();
          formData.append('img', img);
       
          const response = await axios.post(
            `${API_URL}/industryimg/add`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
    
          setindustryimg(response.data);
        setAlert({ open: true, message: lang === 'ar' ? "تمت الاضافة بنجاح":"Added successful!", severity: "success" });

        setTimeout(() => {
            navigate(`/${lang}/services`);
          }, 2000);    
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
        title={lang === "ar" ? "اضافة خدمات الإدارة الرائدة في الصناعة" : " Add IIndustry Leading Managed Services"}
        subtitle={lang === "ar" ? "بيانات خدمات الإدارة الرائدة في الصناعة" : "List of IIndustry Leading Managed Services"}
      />
      {alert.open && (
        <Alert
          severity={alert.severity}
          sx={{
            backgroundColor: alert.severity === "success" ? "#365486" : "#f8d7da",
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
  initialValues={{}} // Define initial values if necessary
>
  {({
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
          sx={{ gridColumn: "span 4",paddingTop:"20px" }}
          label={lang ==="ar" ? "الصورة": "Img"}
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
          { lang ==="ar" ? "اضافة" :" Add "}
        </Button>
      </Box>
    </form>
  )}
</Formik>

    </Box>
  );
};


export default AddIndustryImg;
