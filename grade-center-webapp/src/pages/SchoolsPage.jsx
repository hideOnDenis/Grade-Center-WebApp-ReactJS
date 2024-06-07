import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function SchoolsPage() {
  const [open, setOpen] = useState(false);
  const [schoolData, setSchoolData] = useState({ name: "", address: "" });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log("Save data", schoolData); // Here you would handle the API call
    setOpen(false);
  };

  const handleChange = (e) => {
    setSchoolData({ ...schoolData, [e.target.name]: e.target.value });
  };

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "address", headerName: "Address", width: 300 },
  ];

  // Static rows data
  const rows = [
    { id: 1, name: "Central High", address: "123 Main St" },
    { id: 2, name: "North Grammar", address: "456 North St" },
  ];

  return (
    <Box sx={{ height: "calc(100vh - 64px - 16px - 16px)", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Schools
        </Typography>
        <Box>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add School
          </Button>
          <Button variant="contained" style={{ marginLeft: 8 }} color="success">
            Back to Dashboard
          </Button>
        </Box>
      </Box>

      <DataGrid rows={rows} columns={columns} pageSize={5} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New School</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a school, please enter the name and address of the school
            here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="School Name"
            type="text"
            fullWidth
            variant="standard"
            value={schoolData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="School Address"
            type="text"
            fullWidth
            variant="standard"
            value={schoolData.address}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
