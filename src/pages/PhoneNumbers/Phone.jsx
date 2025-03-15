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
import Codes from "./Codes.jsx";

function Phone() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [Phone, setPhone] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const handleClickOpen = (id) => {
    setCurrentId(id);
    setIsDeletingAll(false)
    setOpen(true);
  };
  const handleOpenDeleteAll=()=>{
    setIsDeletingAll(true)
    setOpen(true);
  }
  const handleUpdate = (id) => {
    navigate(`/${lang}/updatephone`, { state: { id } });
  };

  const columns = [
    {
      field: "name",
      headerName: lang === "ar" ? "الاسم" : "Name",
      flex: 1,
      minWidth: 400,
    },
    {
      field: "phone",
      headerName: lang === "ar" ? "رقم الهاتف" : "Phone Number",
      flex: 1,
      minWidth: 400,
    },
    {
      field: "location",
      headerName: lang === "ar" ? "الموقع" : "Location",
      flex: 2,
      minWidth: 400, // Ensure the column has a minimum width
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
      field: "occu",
      headerName: lang === "ar" ? "العمل" : "Occupation",
      flex: 1,
      minWidth: 400,
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
        const PhoneRes = await axios.get(`${API_URL}/phone`);
        setPhone(PhoneRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, []);
  const handleDelete = async () => {
    try {
      const url=isDeletingAll ? `${API_URL}/phone/deleteall` :`${API_URL}/phone/delete/${currentId}`
      await axios.delete(url);
      if(isDeletingAll){
        setPhone([])
      }
      else{
        setPhone((prevData) => prevData.filter((data) => data.id !== currentId));
      }
      handleClose(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentId(null);
    setIsDeletingAll(false)
  };
  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "ارقام الهواتف" : "Phone"}
        subtitle={lang === "ar" ? "بيانات ارقام الهواتف" : "List of Phone"}
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
            navigate(`/${lang}/addphonenum`);
          }}
        >
          {lang === "ar" ? "اضافة" : "Add"}
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.redAccent[600], // Background color for the button
            color: "#fafafa",
            borderColor: colors.redAccent[400], // Border color
            "&:hover": {
              backgroundColor: colors.redAccent[400], // Background color on hover
              borderColor: colors.redAccent[400], // Border color on hover
            },
            padding: "10px 25px", // Button padding
            fontSize: "16px", // Font size
            fontWeight: "bold", // Font weight
            margin:"0 25px"
          }}
          onClick={handleOpenDeleteAll}
        >
          {lang === "ar" ? "حذف الكل" : "Delete All"}
        </Button>
        <DataGrid
          rows={Phone} // Ensure this is an array of objects
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
    <Codes/>
    </Box>
    
  );
}

export default Phone;
