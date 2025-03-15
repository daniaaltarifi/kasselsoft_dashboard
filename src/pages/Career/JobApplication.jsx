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

function JobApplication() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [jobapplication, setjobapplication] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const handleClickOpen = (id) => {
    setCurrentId(id);
    setOpen(true);
  };
  const handleDownload = async (fileName) => {

    try {
      const response = await axios.get(`${API_URL}/careerform/${fileName}`, {
        responseType: "blob", // Important: responseType blob for downloading files
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  
  const columns = [
    {
      field: "first_name",
      headerName: lang === "ar" ? "الاسم الاول" : "	first_name",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "last_name",
      headerName: lang === "ar" ? "الاسم الاخير" : "last_name",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "email",
      headerName: lang === "ar" ? "البريد الالكتروني" : "email",
      flex: 2,
      minWidth: 400,
    },
    {
      field: "position_name",
      headerName: lang === "ar" ? "اسم الوظيفة" : "position_name",
      flex: 2,
      minWidth: 400,
    },
    {
      field: "exp",
      headerName: lang === "ar" ? "الخبرة" : "exp",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "skills",
      headerName: lang === "ar" ? "المهارات" : "skills",
      flex: 1,
      minWidth: 400,
    },
    {
      field: "phone",
      headerName: lang === "ar" ? "رقم الهاتف" : "phone",
      flex: 1,
      minWidth: 400,
    },
    {
      field: "cv",
      headerName: lang === "ar" ? "السيرة الذاتية" : "cv",
      flex: 1,
      minWidth: 400,

      renderCell: (params) => {
        return (
          <Box m="0 auto" p="5px" display="flex" justifyContent="center">
            <Typography
              color={colors.greenAccent[400]}
              sx={{ ml: "5px" }}
              onClick={() => {
                handleDownload(params.formattedValue
                    ); // Adjust based on your data structure
              }}
            >
              download
            </Typography>
          </Box>
        );
      },
      
    },
    {
      field: "accessLevel",
         headerName: lang === "ar" ? "حذف" : "Delete",

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
    
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const jobapplicationRes = await axios.get(`${API_URL}/careerform`);
        setjobapplication(jobapplicationRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [lang]);
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/careerform/delete/${currentId}`);
      // Remove the deleted department from state
      setjobapplication((prevData) =>
        prevData.filter((data) => data.id !== currentId)
      );

      handleClose(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box m="50px 20px 20px 20px">
      <Header
        title={lang === "ar" ? "طلبات التوظيف حسب الوظيفة" : "Job Applications by Position"}
        subtitle={
          lang === "ar" ? "بيانات طلبات التوظيف حسب الوظيفة" : "List of JobApplications by Position"
        }
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
          rows={jobapplication} // Ensure this is an array of objects
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
    </Box>
  );
}

export default JobApplication;
