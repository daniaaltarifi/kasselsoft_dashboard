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

function Blogs() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [Blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [deleteType, setDeleteType] = useState(null); // 'blog' or 'description'
  const handleClickOpen = (id, type) => {
    setCurrentId(id);
    setDeleteType(type); // Set the type to either 'blog' or 'description'
    setOpen(true);
  };
  const handleUpdate = (id) => {
    navigate(`/${lang}/updateblog`, { state: { id } });
  };
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  const columns = [
    {
      field: "title",
      headerName: lang === "ar" ? "العنوان" : "Title",
      // flex: 5,
      minWidth: 400,
    },
    {
      field: "main_description",
      headerName: lang === "ar" ? "الفقرة الرئيسية" : "	Main Paragraph",
      // flex: 10,
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
      field: "tag_name",
      headerName: lang === "ar" ? "التاغ" : "Tag",
      // flex: 5,
      minWidth: 400,
    },
    {
      field: "description",
      headerName: lang === "ar" ? "الفقرة" : "Paragraph",

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
          {" "}
          {/* Set maxHeight and overflow */}
          {params.row.descriptions &&
            params.row.descriptions.map((desc,index) => (
              <Box
              key={`${params.row.id}-${desc.id}-${index}`} // Add index if necessary
              display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" marginTop={4}>
                  {stripHtmlTags(desc.description)}

                  {/* {desc.description} */}
                </Typography>
                <Typography
                  color={colors.redAccent[400]}
                  sx={{ ml: "5px", cursor: "pointer", marginTop: 4 }}
                  onClick={() => handleClickOpen(desc.id, "description")} // Specify type as 'description'
                >
                  <DeleteOutlineIcon />
                </Typography>
                <Typography
                  color={colors.greenAccent[400]} // Change color as needed
                  sx={{ ml: "5px", cursor: "pointer", marginTop: 4 }}
                  onClick={() => handleEditParagraphClick(desc.id)} // Pass blog.id here
                  >
                  <BorderColorIcon />
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
              handleClickOpen(params.id, "blog");
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
        const BlogsRes = await axios.get(`${API_URL}/blogs/${lang}`);
        setBlogs(BlogsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [lang]);
  const handleDelete = async () => {
    try {
      if (deleteType === "blog") {
        await axios.delete(`${API_URL}/blogs/delete/${lang}/${currentId}`);
        setBlogs((prevData) =>
          prevData.filter((data) => data.id !== currentId)
        );
      } else if (deleteType === "description") {
        await axios.delete(`${API_URL}/blogs/deletedescr/${currentId}`);
        // Optionally, update the descriptions in the specific blog
        setBlogs((prevData) =>
          prevData.map((blog) => {
            if (blog.descriptions) {
              return {
                ...blog,
                descriptions: blog.descriptions.filter(
                  (desc) => desc.id !== currentId
                ),
              };
            }
            return blog;
          })
        );
      }
      handleClose(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditParagraphClick=(id)=>{
    navigate(`/${lang}/updateparagraph`, { state: { id } });
  }
 
  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "المدونات" : "Blogs "}
        subtitle={lang === "ar" ? "بيانات المدونات" : "List of Blogs"}
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
            navigate(`/${lang}/addblog`);
          }}
        >
          {lang === "ar" ? "اضافة" : "Add"}
        </Button>
        <Box
          m="20px"
          sx={{
            overflowX: "auto", // Enable horizontal scrolling
            maxWidth: "100%", // Set maximum width for responsiveness
          }}
        >
          <DataGrid
            rows={Blogs} // Ensure this is an array of objects
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            rowHeight={200} // Set the row height here
            autoHeight // Optional: Add this if you want the grid to adjust height based on the number of rows
          />
        </Box>
      </Box>
      <DeleteDialog
        open={open}
        onClose={handleClose}
        handleDelete={handleDelete}
      />
    </Box>
  );
}

export default Blogs;
