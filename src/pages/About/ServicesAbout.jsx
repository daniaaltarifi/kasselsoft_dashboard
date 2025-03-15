import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useParams,useNavigate } from "react-router-dom";
import { Snackbar, Alert, IconButton } from "@mui/material";

function ServicesAbout() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { lang } = useParams();
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [ServicesAbout, setServicesAbout] = useState([]);
    const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  const columns = [
    {
         field: "title",
         headerName: lang === "ar" ? "العنوان" : "Title",
           flex: 1 ,
           minWidth: 400,
        },
    { field: "icon",
        headerName: lang === "ar" ? " ايقون " : "Icon",
         flex: 1,
         minWidth: 400, },
   
   
    {
        field: "delete",
        headerName: lang === "ar" ? "حذف" : "Delete",
        renderCell: (params) => (
          <Box m="0 auto" p="5px" display="flex" justifyContent="center">
            <IconButton onClick={() => handleDelete(params.id)}>
              <DeleteOutlineIcon style={{ color: colors.redAccent[400] }} />
            </IconButton>
          </Box>
        ),
      },
   
    {
      field: "edit",
      headerName: lang === "ar" ? "تعديل " : "Edit",
      renderCell: (params) => (
        <Box m="0 auto" p="5px" display="flex" justifyContent="center">
          <Typography
            color={colors.greenAccent[400]}
            sx={{ ml: "5px" }}
            onClick={() => handleSubmit(params.id)} // Navigate on click
          >
            <BorderColorIcon />
          </Typography>
        </Box>
      ),
    },
  ];


  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAllData = async () => {
      try {
        const ServicesAboutRes = await axios.get(`${API_URL}/aboutServices/getaboutServicesByLang/${lang}`);
        setServicesAbout(ServicesAboutRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [lang]);

  // Delete contact footer
  const handleDelete = async (id) => {
    if (window.confirm(lang === "ar" ? "هل أنت متأكد من أنك تريد الحذف؟" : "Are you sure you want to delete this?")) {
      try {
        await axios.delete(`${API_URL}/aboutServices/delete/${id}`);
        setAlert({ open: true, message: lang === "ar" ? "تم الحذف بنجاح!" : "Deleted successfully!", severity: "success" });
        
        // Refresh the list by re-fetching data
        const updatedServicesAbout = ServicesAbout.filter((item) => item.id !== id);
        setServicesAbout(updatedServicesAbout);
      } catch (error) {
        console.error("Error deleting contact footer:", error);
        setAlert({ open: true, message: lang === "ar" ? "فشل الحذف" : "Failed to delete!", severity: "error" });
      }
    }
  };

  const handleSubmit = (id) => {
       
    navigate(`/${lang}/updateServicesAbout`, { state: { id } });
  };


  const handleSubmitAdd = () => {
       
    navigate(`/${lang}/addServicesAbout`);
  };



  return (
    <Box m="20px"   sx={{ marginTop: 9 }}>
    <Header
    title={lang === "ar" ? "الخدمات المقدمة  " : "Services Introduced"}
    subtitle={lang === "ar" ? "الصناعات التي نخدمها " : "Industries We Serve"}
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
        "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
          {
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
          "&:hover": {
            backgroundColor: colors.lightBlue[700], // Background color on hover
            borderColor: colors.lightBlue[600], // Border color on hover
          },
          padding: "10px 45px", // Button padding
          fontSize: "16px", // Font size
          fontWeight: "bold", // Font weight
        }}
        onClick={() => {
          navigate(`/${lang}/addservicesabout`);
        }}      >
         {lang === "ar" ? " إضافه جديده   " : "Add"}
      </Button>




      <DataGrid
        rows={ServicesAbout} // Ensure this is an array of objects
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        rowHeight={100} // Set the row height here
      />

        {/* Snackbar for alert messages */}
        <Snackbar
          open={alert.open}
          autoHideDuration={2000}
          onClose={() => setAlert({ ...alert, open: false })}
        >
          <Alert
            onClose={() => setAlert({ ...alert, open: false })}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
    </Box>
  </Box>
);
}

export default ServicesAbout