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
import {  Snackbar, Alert } from "@mui/material"; // Ensure Alert is imported
function Contact() {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [contact, setcontact] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  const columns = [
    {
      field: "email",
      headerName: lang === "ar" ? "البريد الإلكتروني" : "Email",
      flex: 1,
      minWidth: 400,
    },
    {
      field: "name",
      headerName: lang === "ar" ? "الاسم" : "Name",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "message",
      headerName: lang === "ar" ? "الرسالة" : "Message",
      flex: 2,
      minWidth: 400,      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            whiteSpace: "normal", // Allow text to wrap
            wordBreak: "break-word",
            display: "block",
            maxHeight: "100px", // Set a max height for the cell
            overflowY: "auto", // Add vertical scrolling if needed
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "phone",
      headerName: lang === "ar" ? "الهاتف" : "Phone",
      flex: 1,
      headerAlign: "left",
      align: "left",
      minWidth: 300,
    },
    {
        field: "accessLevel",
        headerName: lang === "ar" ? "حذف" : "Delete",
        renderCell: (params) => {
          const { id } = params.row; // Declare the variable outside of JSX
      
          return (
            <Box m="0 auto" p="5px" display="flex" justifyContent="center">
              <Typography
                color={colors.redAccent[400]}
                sx={{ ml: "5px", cursor: "pointer" }}
              >
                
                <DeleteOutlineIcon onClick={() => handleDelete(id)} />
              </Typography>
            </Box>
          );
        },
      }
      
  ]

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const contactRes = await axios.get(`${API_URL}/contactForm`);
        setcontact(contactRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [lang]);


  const handleDelete = async (id) => {
    if (window.confirm(lang === "ar" ? "هل أنت متأكد من أنك تريد الحذف؟" : "Are you sure you want to delete this?")) {
      try {
        await axios.delete(`${API_URL}/contactForm/delete/${id}`);
        
        // Update the contact list after deletion
        const updatedContacts = contact.filter((item) => item.id !== id);
        setcontact(updatedContacts);

        // Show success alert
        setAlert({
          open: true,
          message: lang === "ar" ? "تم الحذف بنجاح!" : "Deleted successfully!",
          severity: "success",
        });
      } catch (err) {
        console.error("Error deleting data:", err);

        // Show error alert
        setAlert({
          open: true,
          message: lang === "ar" ? "فشل الحذف" : "Failed to delete!",
          severity: "error",
        });
      }
    }
  };
  



  return (
    <Box m="20px">
    <Header
      title={lang === "ar" ? " تواصل معنا " : "Contact us"}
      subtitle={lang === "ar" ? "قائمه تواصل معنا " : "List of Contact us"}
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
      
      <DataGrid
        rows={contact} // Ensure this is an array of objects
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


export default Contact