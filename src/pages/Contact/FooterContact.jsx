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

function FooterContact() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [footer, setfooter] = useState([]);

  const handleUpdate = (id) => {
    navigate(`/${lang}/updatefooter`, { state: { id } });
  };

  const columns = [
    {
      field: "logo",
      headerName: lang === "ar" ? "العنوان" : "logo",
      flex: 2,
      minWidth: 300,
    },
    {
      field: "description",
      headerName: lang === "ar" ? "الفقرة الفرعية" : "Paragraph",
      flex: 2,
      minWidth: 700,
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
    },
    {
      field: "support",
      headerName: lang === "ar" ? "الرابط" : "support",
      flex: 2,
      minWidth: 200, // Ensure the column has a minimum width
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
    },
    {
      field: "terms",
      headerName: lang === "ar" ? "العنوان الفرعي" : "terms",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "terms_link",
      headerName: lang === "ar" ? "العنوان الفرعي" : "terms_link",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "privacy",
      headerName: lang === "ar" ? "العنوان الفرعي" : "privacy",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "privacy_link",
      headerName: lang === "ar" ? "العنوان الفرعي" : "privacy_link",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "contact",
      headerName: lang === "ar" ? "العنوان الفرعي" : "contact",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "contact_link",
      headerName: lang === "ar" ? "العنوان الفرعي" : "contact_link",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "company",
      headerName: lang === "ar" ? "العنوان الفرعي" : "	company",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "home",
      headerName: lang === "ar" ? "العنوان الفرعي" : "home_link",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "services",
      headerName: lang === "ar" ? "العنوان الفرعي" : "services",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "services_link",
      headerName: lang === "ar" ? "العنوان الفرعي" : "services_link",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "about",
      headerName: lang === "ar" ? "العنوان الفرعي" : "about",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "about_link",
      headerName: lang === "ar" ? "العنوان الفرعي" : "about_link",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "career",
      headerName: lang === "ar" ? "العنوان الفرعي" : "career",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "career_link",
      headerName: lang === "ar" ? "العنوان الفرعي" : "career_link",
      flex: 2,
      minWidth: 200,
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
        const footerRes = await axios.get(`${API_URL}/footer/${lang}`);
        setfooter(footerRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [lang]);

  return (
    <Box m="50px 20px 20px 20px">
      <Header
        title={lang === "ar" ? "التواصل" : "Footer Contact"}
        subtitle={lang === "ar" ? "بيانات التواصل" : "List of Footer Contact"}
      />
      <Box
        // m="40px 0 0 0"
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
          rows={footer} // Ensure this is an array of objects
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          rowHeight={100} // Set the row height here
        />
      </Box>
    </Box>
  );
}

export default FooterContact;
