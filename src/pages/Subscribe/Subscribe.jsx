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


function Subscribe() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const [Subscribe, setSubscribe] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const handleClickOpen = (id) => {
    setCurrentId(id);
    setOpen(true);
  };

  const columns = [
    {
      field: "email",
      headerName: lang === "ar" ? "البريد الالكتروني" : "Email",
      flex: 1,
      minWidth: 400,
    },
    {
        field: "updated_date",
        headerName: lang === "ar" ? "االتاريخ" : "Created Date",
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
   
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const SubscribeRes = await axios.get(`${API_URL}/Subscribe`);
        setSubscribe(SubscribeRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, []);
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/Subscribe/delete/${currentId}`);

      // Remove the deleted department from state
      setSubscribe((prevData) =>
        prevData.filter((data) => data.id !== currentId)
      );

      handleClose(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "الاشتراكات" : "Subscribe"}
        subtitle={lang === "ar" ? "بيانات الاشتراكات" : "List of Subscribe"}
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
          rows={Subscribe} // Ensure this is an array of objects
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

export default Subscribe;
