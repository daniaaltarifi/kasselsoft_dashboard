import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useParams, useNavigate } from "react-router-dom";
import DeleteDialog from "../../components/DeleteDialog.jsx";
import JobApplication from "./JobApplication.jsx";
import Positions from "./Positions.jsx";
import ByRoleJobApplication from "./ByRoleJobApplication.jsx";

function Career() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [careers, setcareers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const handleClickOpen = (id) => {
    setCurrentId(id);
    setOpen(true);
  };
  const handleUpdate = (id) => {
    navigate(`/${lang}/updatecareer`, { state: { id } });
  };

  const columns = [
    {
      field: "position_name",
      headerName: lang === "ar" ? "عنوان الوظيفة " : "position_name",
      minWidth: 400,      flex: 2,
    },
    {
      field: "location",
      headerName: lang === "ar" ? "الموقع" : "location",
      flex: 2,
      minWidth: 300, // Ensure the column has a minimum width
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal", // Allow text to wrap
            wordBreak: "break-word", // Break long words if necessary
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "exp",
      headerName: lang === "ar" ? "عنوان الوظيفة " : "experience",
      flex: 3,
      minWidth: 300,

    },
    {
      field: "description",
      headerName: lang === "ar" ? "الوصف" : "Description",
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
    }
    ,
    {
      field: "responsabilites",
      headerName: lang === "ar" ? "المسؤوليات" : "responsabilites",
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
      field: "requirment",
      headerName: lang === "ar" ? "المتطلبات" : "requirment",
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
      field: "benefit",
      headerName: lang === "ar" ? "الفوائد" : "benefit",
      flex: 2,
      minWidth: 400,      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal", // Allow text to wrap
            wordBreak: "break-word", // Break long words if necessary
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "open_count",
      headerName: lang === "ar" ? "عدد الوظائف المفتوحة " : "open_count",
      flex: 1,
      minWidth: 200,

    },
    {
      field: "accessLevel",
      headerName: "Delete",
      renderCell: (params) => (
        <Box m="0 auto" p="5px" display="flex" justifyContent="center">
          <Typography
            color={colors.redAccent[400]}
            sx={{ ml: "5px" }}
            onClick={() => {
              handleClickOpen(params.id);
            }}
          >
            <DeleteOutlineIcon />
          </Typography>
        </Box>
      ),
    },
    {
      field: "accessLeve2",
      headerName: lang === "ar" ? "تعديل" : "Edit",
      renderCell: (params) => (
        <Box m="0 auto" p="5px" display="flex" justifyContent="center">
          <Typography
            color={colors.greenAccent[400]}
            sx={{ ml: "5px" }}
            onClick={() => handleUpdate(params.id)} // Use the ID here
          >
            <BorderColorIcon />
          </Typography>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const careersRes = await axios.get(`${API_URL}/careers/${lang}`);
        setcareers(careersRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [lang]);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/careers/delete/${lang}/${currentId}`);
      setcareers((prevData) => prevData.filter((data) => data.id !== currentId));
      handleClose(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting:", error.response ? error.response.data : error.message);
    }
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "الوظائف" : "careers"}
        subtitle={lang === "ar" ? "بيانات الوظائف" : "List of careers"}
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
            navigate(`/${lang}/addcareer`);
          }}
        >
          {lang === "ar" ? "اضافة" : "Add"}
        </Button>
        <DataGrid
          rows={careers} // Ensure this is an array of objects
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          rowHeight={100} // Set the row height here
        />
      </Box>
      <DeleteDialog
        open={open}
        onClose={handleClose}
        handleDelete={handleDelete}
      />
      <Positions/>
   <JobApplication/>
   <ByRoleJobApplication/>
    </Box>
  );
}

export default Career;
