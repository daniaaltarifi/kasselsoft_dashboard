import { Box, Typography, useTheme, Tooltip } from "@mui/material";
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
import TypesOfPortfolio from "./TypesOfPortfolio.jsx";
import ServicesPortfolio from "./ServicesPortfolio.jsx";

function Portfolio() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [Portfolio, setPortfolio] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const handleClickOpen = (id) => {
    setCurrentId(id);
    setOpen(true);
  };
  const handleUpdate = (id) => {
    navigate(`/${lang}/updateportfolio`, { state: { id } });
  };
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  const columns = [
    {
      field: "title",
      headerName: lang === "ar" ? "العنوان" : "Title",
      minWidth: 400,
    },
    {
      field: "description",
      headerName: lang === "ar" ? "الوصف" : "Description",
      minWidth: 400,
      renderCell: (params) => (
        <Tooltip title={params.value || ""} arrow>
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal", // Allow text to wrap
              wordBreak: "break-word", // Break long words if necessary
            }}
          >
            {stripHtmlTags(params.value)}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "link",
      headerName: lang === "ar" ? "الرابط " : "Link",
      minWidth: 400,
    },
    {
      field: "types",
      headerName: lang === "ar" ? "نوع المشروع" : "types",
      minWidth: 400,
    },
    {
      field: "services_provided",
      headerName: lang === "ar" ? "خدمات المشروع" : "services provided",

      minWidth: 400,
      renderCell: (params) => (
        <Box
          sx={{
            maxHeight: 100,
            overflowY: "auto",
            whiteSpace: "normal", // Allow text to wrap
            wordBreak: "break-word",
          }}
        >
          {/* Set maxHeight and overflow */}
          {params.row.services_provided &&
            params.row.services_provided.map((desc, index) => (
              <Box
                key={`${params.row.id}-${desc.service_id}-${index}`} // Add index if necessary
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" marginTop={4}>
                  {stripHtmlTags(desc.service_title)}
                </Typography>
              </Box>
            ))}
        </Box>
      ),
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
        const PortfolioRes = await axios.get(`${API_URL}/portfolio/${lang}`);
        setPortfolio(PortfolioRes.data);
        console.log("portfolio", PortfolioRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [lang]);
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/portfolio/delete/${currentId}`);
      setPortfolio((prevData) =>
        prevData.filter((data) => data.id !== currentId)
      );
      handleClose(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "المشاريع" : "Portfolio "}
        subtitle={lang === "ar" ? "بيانات المشاريع" : "List of Portfolio"}
      />
      <Box
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
        dir="ltr"
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
            navigate(`/${lang}/addportfolio`);
          }}
        >
          {lang === "ar" ? "اضافة" : "Add"}
        </Button>
        <DataGrid
          rows={Portfolio} // Ensure this is an array of objects
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          rowHeight={200} // Set the row height here
        />
      </Box>
      <DeleteDialog
        open={open}
        onClose={handleClose}
        handleDelete={handleDelete}
      />
      <TypesOfPortfolio />
      <ServicesPortfolio />
    </Box>
  );
}

export default Portfolio;
