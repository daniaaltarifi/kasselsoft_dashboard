import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useParams, useNavigate } from "react-router-dom";


function About() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [about, setabout] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const handleClickOpen = (id) => {
    setCurrentId(id);
    setOpen(true);
  };
  const handleUpdate = (id) => {
    navigate(`/${lang}/updateabout`, { state: { id } });
  };

  const columns = [
    {
      field: "point1",
      headerName: lang === "ar" ? "فقرة 1" : "Paragraph 1",
      flex: 2,
      minWidth: 400,
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
      field: "point2",
      headerName: lang === "ar" ? "فقرة 2" : "Paragraph 2",
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
      field: "point3",
      headerName: lang === "ar" ? "فقرة 3" : "Paragraph 3",
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
        const aboutRes = await axios.get(`${API_URL}/api/about/${lang}`);
        setabout(aboutRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [lang]);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "عن كاسل" : " Main About"}
        subtitle={lang === "ar" ? "بيانات عن كاسل" : "List of Main About"}
      />

     {/* <Box
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
      >

        <DataGrid
          rows={about} // Ensure this is an array of objects
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          rowHeight={100} // Set the row height here
        />
      </Box>  */}
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
    rows={about} // Ensure this is an array of objects
    columns={columns}
    components={{ Toolbar: GridToolbar }}
    rowHeight={100} // Set the row height here
  />
</Box>

{/* <Box
  m="40px 0 0 0"
  height="75vh" // Fixed height for the table container
  sx={{
    overflowX: "auto", // Allow horizontal scrolling
    overflowY: "hidden", // Prevent vertical scrolling
    "& .MuiDataGrid-root": {
      border: "none",
    },
    "& .MuiDataGrid-columnHeaders": {
      position: "sticky", // Stick the header
      top: 0, // Stick to the top
      backgroundColor: "#365486", // Ensure it stands out
      zIndex: 1, // Ensure it stays above the rows
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: colors.primary[400],
      overflowX: "hidden", // Prevent double scrollbars
    },
    // Additional styles...
  }}
>
  <DataGrid
    rows={about} // Ensure this is an array of objects
    columns={columns}
    components={{ Toolbar: GridToolbar }}
    rowHeight={100} // Set the row height here
  />
</Box> */}



    </Box>
  );
}

export default About;
