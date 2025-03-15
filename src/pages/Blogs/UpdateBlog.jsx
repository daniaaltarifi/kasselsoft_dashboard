import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  useTheme,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { tokens } from "../../theme";
import { useParams, useLocation,useNavigate } from "react-router-dom";
import "../../Css/blog.css";
import Alert from "@mui/material/Alert";
import TestBlog from "./TestBlog";
import TextEditorMainDescription from "./TextEditorMainDescription";
const BlogUpdateForm = () => {
  const [title, setTitle] = useState("");
  const [mainDescription, setMainDescription] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const { lang } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [tagId, setTagId] = useState("");
  const [tags, setTags] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlogById = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/blogs/${lang}/getbyid/${location.state.id}`
        );
        const blogData = response.data[0];

        setTitle(blogData.title);
        setMainDescription(blogData.main_description);
        setTagId(blogData.tag_id);
        setMainImage(blogData.main_img);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchBlogById();
    const fetchtags = async () => {
      try {
        const response = await axios.get(`${API_URL}/tags/${lang}`);
        const tagsData = response.data;

        setTags(tagsData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchtags();
  }, [location.state]);

  // Ensure your handleDescriptionChange function updates the state correctly
  const handleDescriptionChange = (index, value) => {
    setDescriptions((prevDescriptions) => {
      const updatedDescriptions = [...prevDescriptions];
      updatedDescriptions[index].text = value; // Update the specific description text
      return updatedDescriptions;
    });
  };
  const handleAddDescription = () => {
    setDescriptions([...descriptions, { id: uuidv4(), text: "", images: [] }]);
  };

  const handleImageChange = (index, event) => {
    const files = Array.from(event.target.files);
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index].images = files;
    setDescriptions(updatedDescriptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("lang", lang);
    formData.append("title", title);
    formData.append("main_description", mainDescription);
    formData.append("tag_id", tagId);

    if (mainImage) {
      formData.append("main_img", mainImage);
    }

    // Append new descriptions and images
    descriptions.forEach((desc, index) => {
      if (desc.text) {
        formData.append(`descriptions[${index}][text]`, desc.text);
        desc.images.forEach((image) => {
          formData.append(`descriptions[${index}][img]`, image);
        });
      }
    });

    try {
      const response = await axios.put(
        `${API_URL}/blogs/update/${lang}/${location.state.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setAlert({
        open: true,
        message: lang === "ar" ? "تم التعديل بنجاح" : "updated successfully!",
        severity: "success",
      });

      setTimeout(() => {
        navigate(`/${lang}/blogs`);
      }, 1500);    } catch (error) {
      console.error("Error updating blog:", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h3" className="title_updateblog">
       {lang === "ar" ?"تعديل مدونة":" Update Blog"}
      </Typography>
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
      <form onSubmit={handleSubmit}>
        <TextField
                label={lang === "ar" ? "العنوان" : "Title"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                    top: lang === "ar" ?'8px' : '0'
                  },
                }}
                fullWidth
          style={{ marginBottom: "10px" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {/* <TextField
                label={lang === "ar" ? "الوصف" : "Main Paragraph"}
                InputLabelProps={{
                  sx: {
                    textAlign: lang === "ar" ? "right" : "left",
                    right: lang === "ar" ? 15 : 'auto',
                    left: lang === "ar" ? 'auto' : 0,
                    top: lang === "ar" ?'8px' : '0'
                  },
                }}
                fullWidth
          multiline
          rows={4}
          value={mainDescription}
          onChange={(e) => setMainDescription(e.target.value)}
          required
          style={{ marginBottom: "10px" }}
        /> */}
        <label htmlFor="">{lang === "ar" ? "الوصف" : "Main Paragraph"}</label>
           <TextEditorMainDescription 
          mainDescription={mainDescription} 
          setMainDescription={setMainDescription} 
          required
        />
        <InputLabel id="tag-select-label">  {lang === 'ar' ? "التاغ": "Tag"}</InputLabel>

        <Select
          labelId="tag-select-label"
          value={tagId}
          onChange={(e) => setTagId(e.target.value)}
          fullWidth
        >
          {tags.map((tag) => (
            <MenuItem key={tag.id} value={tag.id}>
              {tag.tag_name} {/* Adjust based on your tag data structure */}
            </MenuItem>
          ))}
        </Select>

        {/* Display current main image if it exists */}
        {mainImage && (
          <div>
            <Typography variant="subtitle1">             {lang === "ar" ? "الصورة" : "Main Image"}
            </Typography>
            <p>{mainImage.name}</p>
          </div>
        )}

        <input
          type="file"
          onChange={(e) => setMainImage(e.target.files[0])}
          accept="image/*"
          style={{ marginBottom: "10px" }}
        />

        {/* Existing Descriptions */}
        {descriptions.map((desc, index) => (
          <div key={desc.id}>
            {/* <TextField
              label={`Paragraph ${index + 1}`}
              fullWidth
              multiline
              rows={3}
              value={desc.text} // Set the value to the description text
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
              required
              style={{ marginBottom: "10px" }}
            /> */}
                <TestBlog 
          key={index} 
          descriptions={descriptions} 
          setDescriptions={setDescriptions} 
          index={index} 
        />
            {/* Display current images if available */}
            {desc.images.length > 0 && (
              <div>
                <Typography variant="subtitle1">Current Images:</Typography>
                {desc.images.map((img, imgIndex) => (
                  <div key={imgIndex}>
                    <p>{img.name}</p>
                  </div>
                ))}
              </div>
            )}
            {desc.images.length === 0 && (
              <input
                type="file"
                multiple
                onChange={(e) => handleImageChange(index, e)}
                accept="image/*"
                style={{ marginBottom: "10px" }}
              />
            )}
          </div>
        ))}
<div>

        <Button
          onClick={handleAddDescription}
          variant="contained"
          sx={{
            backgroundColor: colors.lightBlue[900],
            color: "#fafafa",
            borderColor: colors.lightBlue[100],
            "&:hover": {
              backgroundColor: colors.lightBlue[700],
              borderColor: colors.lightBlue[600],
            },
            marginRight: "25px",
           marginLeft:"25px"
          }}
        >
             {lang === "ar" ? "اضف وصف" : " Add Description"}

        </Button>
        <Button type="submit" variant="contained" color="secondary">
           {lang === "ar" ? "تعديل" : " Update Blog "}

        </Button>
</div>
      </form>
    </div>
  );
};

export default BlogUpdateForm;
