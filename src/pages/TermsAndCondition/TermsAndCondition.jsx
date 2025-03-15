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
import DeleteDialog from "../../components/DeleteDialog.jsx";
import BlackTerms from "./BlackTerms.jsx";
import BlueTerms from "./BlueTerms.jsx";

function TermsAndCondition() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [termsandcondition, settermsandcondition] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const handleClickOpen = (id) => {
    setCurrentId(id);
    setOpen(true);
  };
  const handleUpdate = (id) => {
    navigate(`/${lang}/updatetermsandcondition`, { state: { id } });
  };

  const columns = [
    {
      field: "main_title",
      headerName: lang === "ar" ? " االعنوان الرئيسي" : "main_title",
      flex: 1,
      minWidth: 300, // Ensure the column has a minimum width
    },
    {
      field: "main_subtitle",
      headerName: lang === "ar" ? " العنوان الفرعي" : "main_subtitle",
      flex: 1,
      minWidth: 300, // Ensure the column has a minimum width
    },
    {
        field: "main_description",
        headerName: lang === "ar" ? "الفقرة" : "main Paragraph",
        flex: 2,
        minWidth: 800,
     
        renderCell: (params) => (
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
      field: "tiltle_Interpretation",
      headerName: lang === "ar" ? "التفسير" : "title_Interpretation",
      flex: 1,
      minWidth: 300, // Ensure the column has a minimum width
    },
    {
      field: "description_Interpretation",
      headerName: lang === "ar" ? "وصف التفسير" : "description_Interpretation",
      flex: 5,
      minWidth: 800, // Ensure the column has a minimum width
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
      field: "Severability_title",
      headerName: lang === "ar" ? "قابلية الفصل" : "Severability_title",
      flex: 1,
      minWidth: 300, // Ensure the column has a minimum width
    },
    {
      field: "Severability_description",
      headerName: lang === "ar" ? "وصف قابلية الفصل" : "Severability_description",
      flex: 2,
      minWidth: 800, // Ensure the column has a minimum width
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
      field: "page_type",
      headerName: lang === "ar" ? "العنوان" : "page_type",
      flex: 1,
      minWidth: 200, // Ensure the column has a minimum width
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
        const termsandconditionRes = await axios.get(
          `${API_URL}/termsandconditions/${lang}`
        );
        settermsandcondition(termsandconditionRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [lang]);

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "الشروط والاحكام" : "Terms and Conditions"}
        subtitle={
          lang === "ar"
            ? "بيانات الشروط والاحكام"
            : "List of Terms and Conditions"
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
          rows={termsandcondition} // Ensure this is an array of objects
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          rowHeight={100} // Set the row height here
          autoHeight={false}
          disableColumnMenu // Optional: to simplify the header menu

        />
      </Box>
      <BlackTerms/>
      <BlueTerms/>
    </Box>
  );
}

export default TermsAndCondition;
