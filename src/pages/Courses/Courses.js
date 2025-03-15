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

function Courses() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = 'http://localhost:9090';
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleClickOpen = (id) => {
    setCurrentId(id);
    setOpen(true);
  };

  const handleUpdate = (id) => {
    navigate(`/${lang}/Updatecourse/${id}`);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      minWidth: 100,
    },
    {
      field: "title",
      headerName: lang === "ar" ? "اسم الدورة" : "Course Name",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "lang",
      headerName: lang === "ar" ? "اللغة" : "Language",
      flex: 0.5,
      minWidth: 100,
    },
    {
      field: "actions_delete",
      headerName: lang === "ar" ? "حذف" : "Delete",
      flex: 0.5,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center">
          <Typography
            color={colors.redAccent[400]}
            sx={{ cursor: "pointer" }}
            onClick={() => handleClickOpen(params.row.id)}
          >
            <DeleteOutlineIcon />
          </Typography>
        </Box>
      ),
    },
    {
      field: "actions_edit",
      headerName: lang === "ar" ? "تعديل" : "Edit",
      flex: 0.5,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center">
          <Typography
            color={colors.greenAccent[400]}
            sx={{ cursor: "pointer" }}
            onClick={() => handleUpdate(params.row.id)}
          >
            <BorderColorIcon />
          </Typography>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_URL}/courses/Allcourses/en`);
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, [lang]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/courses/deleteCourse/${currentId}`);
      setCourses(prev => prev.filter(course => course.id !== currentId));
      handleClose();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "الدورات" : "Courses"}
        subtitle={lang === "ar" ? "قائمة الدورات المتاحة" : "List of Courses"}
      />

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#365486",
            color: "#fafafa",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#365486",
            color: "#fafafa",
          },
          "& .MuiTablePagination-root": { color: "#fafafa" },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
        dir="ltr"
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.lightBlue[900],
            color: "#fafafa",
            "&:hover": { backgroundColor: colors.lightBlue[700] },
            padding: "10px 45px",
            fontSize: "16px",
            fontWeight: "bold",
            mb: 2
          }}
          onClick={() => navigate(`/${lang}/addcourse`)}
        >
          {lang === "ar" ? "إضافة دورة" : "Add Course"}
        </Button>

        <DataGrid
          rows={courses}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          autoHeight
          disableSelectionOnClick
        />
      </Box>

      <DeleteDialog
        open={open}
        onClose={handleClose}
        handleDelete={handleDelete}
        title={lang === "ar" ? "حذف الدورة" : "Delete Course"}
        content={lang === "ar" 
          ? "هل أنت متأكد من رغبتك في حذف هذه الدورة؟" 
          : "Are you sure you want to delete this course?"}
      />
    </Box>
  );
}

export default Courses;