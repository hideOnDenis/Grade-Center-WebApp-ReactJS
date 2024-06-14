import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function AbsencePageStudent() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [absenceData, setAbsenceData] = useState({
    date: "",
    course: "",
  });

  // Static absences data
  const absences = [
    { date: "2024-01-10", course: "Mathematics" },
    { date: "2024-02-15", course: "Physics" },
    { date: "2024-03-20", course: "History" },
  ];

  const columns = [
    { field: "date", headerName: "Date", width: 200 },
    { field: "course", headerName: "Course", width: 300 },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAbsenceData({ ...absenceData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Submitting absence data:", absenceData); // Debugging log
    // Implement the submit logic here
    handleClose();
  };

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
          Absences
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/student/dashboard")}
        >
          Back to Dashboard
        </Button>
      </Box>
      <DataGrid
        rows={absences.map((absence, index) => ({
          id: index,
          date: absence.date,
          course: absence.course,
        }))}
        columns={columns}
        pageSize={5}
        components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Absence</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="date"
            label="Date"
            type="date"
            fullWidth
            variant="standard"
            value={absenceData.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="course"
            label="Course"
            type="text"
            fullWidth
            variant="standard"
            value={absenceData.course}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
