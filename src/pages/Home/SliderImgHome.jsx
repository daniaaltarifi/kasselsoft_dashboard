import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useParams, useNavigate } from "react-router-dom";
import DeleteDialog from '../../components/DeleteDialog.jsx'


function SliderImgHome() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [sliderimg, setsliderimg] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null); 

  const handleUpdate = (id) => {
    navigate(`/${lang}/updateserviceshome`, { state: { id } });
  };
  const handleClickOpen = (id) => {
      setCurrentId(id);
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${API_URL}/imgsliderhome/delete/${currentId}`
      );

      // Remove the deleted department from state
      setsliderimg((prevData) =>
        prevData.filter((data) => data.id !== currentId)
      );

      handleClose(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };
  const columns = [
    {
      field: "img",
      headerName: lang === "ar" ? "الصورة" : "Image",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <img
            src={`${API_URL}/${params.value}`} // Adjust path as needed
            alt="Slider"
            style={{ width: "200px", height: "auto", borderRadius: "4px" }}
          />
        </Box>
      ),
    },
      {
      field: "accessLevel",
      headerName: lang === "ar" ? "حذف" : "Delete",
      renderCell: (params) => (
        <Box m="0 auto" p="5px" display="flex" justifyContent="center">
          <Typography color={colors.redAccent[400]} sx={{ ml: "5px" }}onClick={()=>{handleClickOpen(params.id)}}
          >
            <DeleteOutlineIcon />
          </Typography>
        </Box>
      ),
    },
   
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const sliderimgRes = await axios.get(`${API_URL}/imgsliderhome`);
        setsliderimg(sliderimgRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, []);

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "الصور" : "Slider Image Home"}
        subtitle={lang === "ar" ? "بيانات الصور" : "List of Slider Image Home"}
      />

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[400],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#365486",
            borderBottom: "none",
            color: "#fafafa",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#365486",
            color: "#fafafa",
          },
          "& .MuiTablePagination-root": {
            color: "#fafafa",
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            color: "#fafafa",
          },
          "& .MuiTablePagination-actions .MuiButtonBase-root": {
            color: "#fafafa",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
        dir='ltr'

      >
            <Button
       variant="contained"
        sx={{
          backgroundColor: colors.lightBlue[900], // Background color for the button
        color: "#fafafa",
          borderColor: colors.lightBlue[100], // Border color
          '&:hover': {
            backgroundColor: colors.lightBlue[700], // Background color on hover
            borderColor: colors.lightBlue[600], // Border color on hover
          },
          padding: "10px 45px", // Button padding
          fontSize: "16px", // Font size
          fontWeight: "bold", // Font weight
        }}
        onClick={()=>{navigate(`/${lang}/addimgslider`)}}
      >
        {lang === 'ar' ? "اضافة":"Add"}
      </Button>
        <DataGrid
          rows={sliderimg} // Ensure this is an array of objects
          columns={columns}
          rowHeight={100} // Set the row height here

          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <DeleteDialog open={open} onClose={handleClose} handleDelete={handleDelete} />

    </Box>
  );
}

export default SliderImgHome;
