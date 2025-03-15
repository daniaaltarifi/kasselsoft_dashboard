import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useParams } from "react-router-dom";
function DeleteDialog({ open, onClose, handleDelete }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLightMode = theme.palette.mode === "light";
  const buttonDialogStyle = {
    color: isLightMode ? "#000" : "#fff",
  };
  const { lang } = useParams();

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" style={{ display: "flex" }}>
        <WarningAmberIcon style={{ color: "red" }} />
        {lang === "ar" ? "تأكيد الحذف" : "Confirm Delete"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {lang === "ar"
            ? "هل انت متأكد من الحذف "
            : "  Are you sure you want to delete? This action cannot be undone."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} style={buttonDialogStyle}>
          {lang === "ar" ? "الغاء" : "Cancel"}
        </Button>
        <Button onClick={handleDelete} color="primary" style={{ color: "red" }}>
          {lang === "ar" ? "تأكيد " : "Confirm "}{" "}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
