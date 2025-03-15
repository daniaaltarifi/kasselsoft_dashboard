import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  useTheme,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { tokens } from "../../theme";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../../Css/blog.css";
import Alert from "@mui/material/Alert";
import TextEditorMainDescription from "./TextEditorMainDescription";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../../components/DeleteDialog.jsx";

const UpdateParagraph = () => {
  const [mainDescription, setMainDescription] = useState("");
  const [descriptionData, setDescriptionData] = useState("");
  const [img, setimg] = useState(null);
  const { lang } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [open, setOpen] = useState(false);
  const [openchoosefile, setOpenchoosefile] = useState(false);
const [newaddedimages,setnewaddedimages]=useState([])
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const handleClickOpen = (id) => {
    setSelectedImageId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchParagraphById = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/blogs/paragraphs/${location.state.id}`
        );

        // Assuming response.data is structured as described in your example
        const blogData = response.data;
        // Set the description data including images with IDs
        const imagesWithIds =
          blogData.images.map((img) => ({
            id: img.id, // Ensure ID is included
            img: img.img,
          })) || [];
        setDescriptionData({
          id: blogData.description_id,
          description: blogData.description,
          images: imagesWithIds, // Set images with IDs
        });

        setMainDescription(blogData.description); // Set the  description here
        // Log the images after the state has been set
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchParagraphById();
  }, [location.state]);

  const handleImageChange = (imgId, event) => {
    const file = event.target.files[0]; // Get the selected file
    setSelectedImageId(imgId); // Store the ID of the image to update
    setimg(file); // Store the selected file
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (img) {
      formData.append("img", img);
    }

    try {
      const response = await axios.put(
        `${API_URL}/blogs/paragraphsimg/update/${selectedImageId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setAlert({
        open: true,
        message:
          lang === "ar" ? "تم التعديل بنجاح" : "updated img successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating blog:", error);
      // Handle error, e.g., show an error message
    }
  };
  const handleParagraph = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}/blogs/paragraphs/update/${location.state.id}`,
        { description: mainDescription }, // Ensure you're sending the correct field
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.message) {
        setAlert({
          open: true,
          message: lang === "ar" ? "تم التعديل بنجاح" : "Updated successfully!",
          severity: "success",
        });
      }
      setTimeout(() => {
        navigate(`/${lang}/blogs`);
      }, 1500);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/blogs/deleteimg/${selectedImageId}`);
  
      // Update descriptionData to remove the deleted image
      setDescriptionData((prevData) => {
        if (prevData && Array.isArray(prevData.images)) {
          return {
            ...prevData,
            images: prevData.images.filter((image) => image.id !== selectedImageId),
          };
        }
        return prevData; // Handle as needed
      });
      handleClose()
    } catch (error) {
      console.error("Error deleting:", error.response ? error.response.data : error.message);
    }
  };
  const handleAddImg=()=>{
    setOpenchoosefile(true)
  }
  const handleChangeJustImg = (files) => {
    const selectedFiles = Array.from(files); // Convert FileList to an array
    setnewaddedimages((prevImages) => [...prevImages, ...selectedFiles]); // Append new images
  };
  
  const handlepostimg = async () => {
    if (newaddedimages.length === 0) {
      setAlert({
        open: true,
        message: lang === "ar" ? "الرجاء اختيار صورة واحدة على الاقل" : "Please select at least one image before adding.!",
        severity: "error",
      });
      return; // Prevent further execution if no images
    }
    const formData = new FormData();
        newaddedimages.forEach((image) => {
      formData.append("newimg", image); // Ensure each image is appended
    });
    const blogdescId = location.state.id;
    formData.append("blog_description_id", blogdescId); // Append blog ID
    try {
      const response = await axios.post(
        `${API_URL}/blogs/addimgblog/${blogdescId}`,
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
      console.error(`Error fetching post data: ${error.response?.data?.message || error.message}`);
    }
  };
  
  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h3" className="title_updateblog">
        {lang === "ar" ? "تعديل فقرة" : " Update Paragraph"}
      </Typography>
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
      <form onSubmit={handleParagraph}>
        {descriptionData && (
          <div key={descriptionData.id}>
            <TextEditorMainDescription
              mainDescription={mainDescription}
              setMainDescription={setMainDescription}
            />

            {/* Display current images if available */}
            {descriptionData.images.length > 0 && (
              <div>
                <Typography variant="subtitle1">Current Images:</Typography>
                {descriptionData.images.map((img) => {
                  return (
                    <div key={img.id}>
                      <p>{img.img}</p>
                      <input
                        type="file"
                        onChange={(e) => handleImageChange(img.id, e)} // Pass the image ID and event
                        accept="image/*"
                        style={{ marginBottom: "10px" }}
                      />
                      {/* <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        onClick={handleSubmit}
                      >
                        <BorderColorIcon />
                      </Button> */}

                      <IconButton
                        aria-label="edit"
                        color="success"
                        onClick={handleSubmit}
                      >
                        <BorderColorIcon />
                      </IconButton>
                      <IconButton aria-label="delete" color="error"  onClick={() => {
              handleClickOpen(img.id);
            }}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div>
          <Button variant="contained"style={{backgroundColor:"#365486",margin:"1vh"}}onClick={handleAddImg}>
            {lang === "ar" ? "اضافة صورة جديدة" : " Add new image  "}
          </Button>
       
          <Button type="submit" variant="contained" color="secondary">
            {lang === "ar" ? "تعديل" : " Update Paragraph "}
          </Button>
        </div>
        {openchoosefile && (
  <div>
    <input
      type="file"
      onChange={(e) => handleChangeJustImg(e.target.files)} // Use e.target.files directly
      accept="image/*"
      style={{ marginBottom: "10px" }}
      multiple
    />
    <Button 
      variant="contained"
      style={{ backgroundColor: "#365486", margin: "1vh" }}
      onClick={handlepostimg}
    >
      {lang === "ar" ? "اضافة " : "Add"}
    </Button>
  </div>
)}
      </form>
      <DeleteDialog
        open={open}
        onClose={handleClose}
        handleDelete={handleDelete}
      />
    </div>
    
  );
};

export default UpdateParagraph;
