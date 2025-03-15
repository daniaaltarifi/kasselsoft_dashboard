import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { tokens } from "../../theme";
import TestBlog from "./TestBlog";
import TextEditorMainDescription from "./TextEditorMainDescription";
const AddBlog = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [main_img, setmain_Img] = useState(null);
  const [tags, settags] = useState([]);
  const [title, settitle] = useState("");
  const [tag_id, settag_id] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [descriptions, setDescriptions] = useState([{ text: "", images: [] }]);
  const [mainDescription, setMainDescription] = useState("");
  const handleMainDescriptionChange = (value) => {
    setMainDescription(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchtags = async () => {
      try {
        const BlogsRes = await axios.get(`${API_URL}/tags/${lang}`);
        settags(BlogsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchtags();
  }, []);

  const handlemain_Img = (e) => {
    setmain_Img(e.target.files[0]);
  };

  const handleImageChange = (index, files) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index].images = Array.from(files); // Convert FileList to Array
    setDescriptions(newDescriptions);
  };

  const handleAddDescription = () => {
    if (descriptions.length < 10) {
      setDescriptions([...descriptions, { text: "", images: [] }]);
    }
  };

  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("main_description", mainDescription);
    formData.append("tag_id", tag_id);
    formData.append("main_img", main_img);

    values.descriptions.forEach((desc, index) => {
      formData.append(`descriptions[${index}][text]`, desc.text);
      desc.images.forEach((image) => {
        formData.append(`descriptions[${index}][img]`, image);
      });
    });

    try {
      const response = await axios.post(
        `${API_URL}/blogs/add/${lang}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAlert({
        open: true,
        message: lang === "ar" ? "تمت الاضافة بنجاح" : "Added successfully!",
        severity: "success",
      });

      setTimeout(() => {
        navigate(`/${lang}/blogs`);
      }, 1500);
    } catch (error) {
      console.log(`Error fetching post data ${error}`);
    }
  };

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "اضافة مدونة" : "Add Blog"}
        subtitle={lang === "ar" ? "بيانات مدونة" : "List of blogs"}
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
        enableReinitialize={true}
        onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
        initialValues={{
          title: title || "",
          tag_id: tag_id || "",
          main_description: mainDescription, // Set this correctly,
          descriptions,
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
              // gridTemplateColumns="repeat(4, minmax(0, 5fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                label={lang === "ar" ? "العنوان" : "Title"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                onBlur={handleBlur}
                onChange={(e) => {
                  settitle(e.target.value);
                }}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />

              <FormControl
                fullWidth
                variant="filled"
                error={!!touched.tag_id && !!errors.tag_id}
                sx={{
                  gridColumn: "span 2",
                  "& .MuiInputLabel-root": {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 45 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                  "& .MuiSelect-select": {
                    textAlign: lang === "ar" ? "right" : "left",
                  },
                }}
              >
                <InputLabel>{lang === "ar" ? "التاغ" : "Tag"}</InputLabel>
                <Select
                  label={lang === "ar" ? "التاغ" : "Tag"}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    settag_id(e.target.value);
                  }}
                  value={values.tag_id}
                  name="tag_id"
                >
                  {tags.map((tag) => (
                    <MenuItem key={tag.id} value={tag.id}>
                      {lang === "ar" ? tag.tag_name : tag.tag_name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.tag_id && errors.tag_id}
                </FormHelperText>
              </FormControl>
              <Box>
                <label htmlFor="">
                  {lang === "ar" ? "الوصف" : "Main Paragraph"}
                </label>
                <TextEditorMainDescription
                  mainDescription={mainDescription}
                  setMainDescription={handleMainDescriptionChange} // Update with the new function
                />
              </Box>
              {touched.main_description && errors.main_description && (
                <Typography variant="body2" color="error">
                  {errors.main_description}
                </Typography>
              )}
              <TextField
                sx={{ gridColumn: "span 4" }}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 18 : "auto",
                    left: lang === "ar" ? "auto" : 0,
                  },
                }}
                variant="outlined"
                type="file"
                onChange={handlemain_Img}
                required
              />
              {/* Dynamic Description Fields */}
              {descriptions.map((desc, index) => (
                <Box key={index} mb={2}>
                  <TestBlog
                    key={index}
                    descriptions={descriptions}
                    setDescriptions={setDescriptions}
                    index={index}
                  />
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleImageChange(index, e.target.files)}
                  />
                  {desc.images.length > 0 && (
                    <Box mt={1}>
                      <Typography variant="body2">Selected Images:</Typography>
                      {desc.images.map((image, imgIndex) => (
                        <Typography key={imgIndex}>{image.name}</Typography>
                      ))}
                    </Box>
                  )}
                  {touched.descriptions?.[index]?.images &&
                    errors.descriptions?.[index]?.images && (
                      <Typography variant="body2" color="error">
                        {errors.descriptions[index].images}
                      </Typography>
                    )}
                </Box>
              ))}
            </Box>
            <Button
              onClick={handleAddDescription}
              variant="contained"
              disabled={descriptions.length >= 10}
              sx={{
                backgroundColor: colors.lightBlue[900],
                color: "#fafafa",
                borderColor: colors.lightBlue[100],
                "&:hover": {
                  backgroundColor: colors.lightBlue[700],
                  borderColor: colors.lightBlue[600],
                },
                padding: "5px 25px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Add Description
            </Button>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {lang === "ar" ? "اضافة" : "Add"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  tag_id: yup.string().required("Tag ID is required"),
  main_description: yup.string().required("Main description is required"),

  descriptions: yup
    .array()
    .of(
      yup.object().shape({
        text: yup.string().required("Description text is required"),
        // images: yup.array().min(1, "At least one image is required"),
      })
    )
    .required("Descriptions are required")
    .min(1, "At least one description is required"),
});

export default AddBlog;
