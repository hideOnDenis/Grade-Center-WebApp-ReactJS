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
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function StudentsPageTeacher() {
  const navigate = useNavigate();
  const [openGrade, setOpenGrade] = useState(false);
  const [openAbsence, setOpenAbsence] = useState(false);
  const [gradeData, setGradeData] = useState({
    studentId: "",
    courseId: "",
    grade: "",
  });
  const [absenceData, setAbsenceData] = useState({
    studentId: "",
    courseId: "",
    date: "",
    reason: "",
  });

  // Static students data
  const students = [
    { id: 1, name: "John Doe", course: "Mathematics", grade: "A", absences: 2 },
    { id: 2, name: "Jane Smith", course: "Physics", grade: "B+", absences: 1 },
    {
      id: 3,
      name: "Alice Johnson",
      course: "Chemistry",
      grade: "A-",
      absences: 0,
    },
    // Add more students as needed
  ];

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "course", headerName: "Course", width: 200 },
    { field: "grade", headerName: "Grade", width: 100 },
    { field: "absences", headerName: "Absences", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenGrade(params.row)}
            sx={{ marginRight: 1 }}
          >
            Edit Grade
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleOpenAbsence(params.row)}
          >
            Add Absence
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
          course: student.course,
          grade: student.grade,
          absences: student.absences,
        }))}
        columns={columns}
        pageSize={5}
        components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
      />

      <Dialog open={openGrade} onClose={handleCloseGrade}>
        <DialogTitle>Edit Grade</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="courseId"
            label="Course ID"
            type="text"
            fullWidth
            variant="standard"
            value={gradeData.courseId}
            onChange={handleGradeChange}
          />
          <TextField
            margin="dense"
            name="grade"
            label="Grade"
            type="text"
            fullWidth
            variant="standard"
            value={gradeData.grade}
            onChange={handleGradeChange}
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
            name="courseId"
            label="Course ID"
            type="text"
            fullWidth
            variant="standard"
            value={absenceData.courseId}
            onChange={handleAbsenceChange}
          />
          <TextField
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
