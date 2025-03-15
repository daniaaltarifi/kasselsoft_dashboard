import { Box, Typography, useTheme,useMediaQuery } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useParams, useNavigate } from "react-router-dom";
import ExperienceHome from "./ExperienceHome";

function LastTwoSection() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [careersHome, setcareersHome] = useState([]);

  const handleUpdate = (id) => {
    navigate(`/${lang}/updatecareershome`, { state: { id } });
  };

  const columns = [
    { field: "title", headerName:lang ==="ar" ? "العنوان" : "Title", flex: 1 , minWidth: 400,},
    {
      field: "count",
      headerName: lang ==="ar" ? "الرقم" : "Count",
      flex: 2,
      minWidth: 200, // Ensure the column has a minimum width
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
      field: "accessLeve2",
      headerName:lang ==="ar" ? "تعديل" : "Edit",
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
    window.scrollTo(0, 0);
    const fetchAllData = async () => {
      try {
        const careersHomeRes = await axios.get(`${API_URL}/careershome/${lang}`);
        setcareersHome(careersHomeRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [lang]);

  return (
    <Box m="20px">
     <Header title={lang ==="ar" ? "فرص العمل" :"Career opportunities"} subtitle={lang === 'ar' ? "بيانات فرص العمل" :"List of Career opportunities" }/>

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
        <DataGrid 
               
          rows={careersHome} // Ensure this is an array of objects
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          rowHeight={100} // Set the row height here
        />
      </Box>
      <ExperienceHome/>
    </Box>
  );
}

export default LastTwoSection;
