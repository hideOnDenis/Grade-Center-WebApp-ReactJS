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
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function StudentsPageDirector() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    studentId: "",
    grade: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log("Assigning Data", assignmentData);
    setOpen(false);
  };

  const handleChange = (event) => {
    setAssignmentData({
      ...assignmentData,
      [event.target.name]: event.target.value,
    });
  };

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "grade", headerName: "Grade", width: 100 },
  ];

  // Static rows data for demonstration
  const rows = [
    { id: 1, name: "John Doe", grade: "10" },
    { id: 2, name: "Jane Smith", grade: "12" },
  ];

  // Mock students data for the dropdown
  const students = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
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
          Students
        </Typography>
        <Box>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Assign Student to Grade/Class
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/director/dashboard")}
            sx={{ marginLeft: 2 }}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Box>

      <DataGrid rows={rows} columns={columns} pageSize={5} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Assign to Grade/Class</DialogTitle>
        <DialogContent>
          <TextField
            select
            autoFocus
            margin="dense"
            name="studentId"
            label="Select Student"
            fullWidth
            value={assignmentData.studentId}
            onChange={handleChange}
          >
            {students.map((student) => (
              <MenuItem key={student.id} value={student.id}>
                {student.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            margin="dense"
            name="grade"
            label="Grade"
            fullWidth
            value={assignmentData.grade}
            onChange={handleChange}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                Grade {i + 1}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
