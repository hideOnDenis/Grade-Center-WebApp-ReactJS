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

export default function StudentsPageTeacher() {
  const navigate = useNavigate();
  const [openGrade, setOpenGrade] = useState(false);
  const [openAbsence, setOpenAbsence] = useState(false);
  const [gradeData, setGradeData] = useState({
    studentId: "",
    grade: "",
  });
  const [absenceData, setAbsenceData] = useState({
    studentId: "",
    date: "",
    reason: "",
  });

  // Static students data
  const students = [
    {
      id: 1,
      name: "John Doe",
      grades: [5, 4, 3],
      absences: [{ date: "2024-06-15", reason: "Sick" }],
    },
    {
      id: 2,
      name: "Jane Smith",
      grades: [6, 5, 5],
      absences: [{ date: "2024-06-14", reason: "Family event" }],
    },
    {
      id: 3,
      name: "Alice Johnson",
      grades: [4, 4, 5],
      absences: [{ date: "2024-06-13", reason: "Personal" }],
    },
    // Add more students as needed
  ];

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "grades",
      headerName: "Grades",
      width: 300,
      renderCell: (params) => params.value.join(", "),
    },
    {
      field: "absences",
      headerName: "Absences",
      width: 300,
      renderCell: (params) =>
        params.value.map((absence, index) => (
          <div key={index}>
            {absence.date} - {absence.reason}
          </div>
        )),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 600,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenGrade(params.row)}
            sx={{ marginRight: 1 }}
          >
            Add Grade
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleOpenAbsence(params.row)}
            sx={{ marginRight: 1 }}
          >
            Add Absence
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteGrade(params.row)}
          >
            Delete Grade
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteAbsence(params.row)}
            sx={{ marginLeft: 1 }}
          >
            Delete Absence
          </Button>
        </Box>
      ),
    },
  ];

  const handleOpenGrade = (student) => {
    setGradeData({ ...gradeData, studentId: student.id });
    setOpenGrade(true);
  };

  const handleCloseGrade = () => setOpenGrade(false);

  const handleOpenAbsence = (student) => {
    setAbsenceData({ ...absenceData, studentId: student.id });
    setOpenAbsence(true);
  };

  const handleCloseAbsence = () => setOpenAbsence(false);

  const handleGradeChange = (event) => {
    const { name, value } = event.target;
    setGradeData({ ...gradeData, [name]: value });
  };

  const handleAbsenceChange = (event) => {
    const { name, value } = event.target;
    setAbsenceData({ ...absenceData, [name]: value });
  };

  const handleGradeSubmit = () => {
    console.log("Submitting grade data:", gradeData); // Debugging log
    // Implement the submit logic here
    handleCloseGrade();
  };

  const handleAbsenceSubmit = () => {
    console.log("Submitting absence data:", absenceData); // Debugging log
    // Implement the submit logic here
    handleCloseAbsence();
  };

  const handleDeleteGrade = (student) => {
    console.log("Deleting grade for student:", student.id); // Debugging log
    // Implement the delete logic here
  };

  const handleDeleteAbsence = (student) => {
    console.log("Deleting absence for student:", student.id); // Debugging log
    // Implement the delete logic here
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
          Students
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/teacher/dashboard")}
        >
          Back to Dashboard
        </Button>
      </Box>
      <DataGrid
        rows={students.map((student, index) => ({
          id: index,
          name: student.name,
          grades: student.grades,
          absences: student.absences,
        }))}
        columns={columns}
        pageSize={5}
        components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
      />

      <Dialog open={openGrade} onClose={handleCloseGrade}>
        <DialogTitle>Add Grade</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="grade"
            label="Grade"
            type="number"
            fullWidth
            variant="standard"
            value={gradeData.grade}
            onChange={handleGradeChange}
            inputProps={{ min: 2, max: 6 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGrade}>Cancel</Button>
          <Button onClick={handleGradeSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAbsence} onClose={handleCloseAbsence}>
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
            onChange={handleAbsenceChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="reason"
            label="Reason"
            type="text"
            fullWidth
            variant="standard"
            value={absenceData.reason}
            onChange={handleAbsenceChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAbsence}>Cancel</Button>
          <Button onClick={handleAbsenceSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
