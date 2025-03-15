import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import Button from '@mui/material/Button';

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Delete",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
          
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
           
          >
          
           
            <Typography color={colors.redAccent[400]} sx={{ ml: "5px" }}>
            <DeleteOutlineIcon />
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "accessLeve2",
      headerName: "Edet",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
          
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
           
          >
          
           
            <Typography color={colors.greenAccent[400]} sx={{ ml: "5px" }}>
            <EditNotificationsIcon />
            </Typography>
          </Box>
        );
      },
    },
   
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
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
            backgroundColor:  "#365486",
            borderBottom: "none",
            color: "#fafafa",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor:"#365486",
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
      >
         <Button
       variant="contained"
        sx={{
          backgroundColor: colors.lightBlue[900], // Background color for the button
        color: "#fafafa",
          borderColor: colors.lightBlue[100], // Border color
          '&:hover': {
            backgroundColor: colors.lightBlue[700], // Background color on hover
            borderColor: colors.lightBlue[600], // Border color on hover
          },
          padding: "10px 45px", // Button padding
          fontSize: "16px", // Font size
          fontWeight: "bold", // Font weight
        }}
      >
        Add
      </Button>
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
