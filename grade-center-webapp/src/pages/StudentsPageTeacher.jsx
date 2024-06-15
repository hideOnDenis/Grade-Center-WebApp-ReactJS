import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/students/studentSlice";
import { fetchAllAbsences } from "../features/absences/absenceSlice";

export default function StudentsPageTeacher() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { students, status: studentStatus } = useSelector(
    (state) => state.students
  );
  const { absences, status: absenceStatus } = useSelector(
    (state) => state.absence
  ); // Corrected here
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

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchAllAbsences());
  }, [dispatch]);

  const countStudentAbsences = (studentId) => {
    return absences.filter((absence) => absence.studentId === studentId).length;
  };

  const columns = [
    { field: "username", headerName: "Name", width: 200 },
    {
      field: "grades",
      headerName: "Grades",
      width: 300,
      renderCell: (params) =>
        Array.isArray(params.value)
          ? params.value.map((grade) => grade.grade).join(", ")
          : "",
    },
    {
      field: "absences",
      headerName: "Absences",
      width: 100,
      renderCell: (params) => countStudentAbsences(params.row.id),
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
        rows={students.map((student) => ({
          id: student.id,
          username: student.username,
          grades: student.grades,
          absences: countStudentAbsences(student.id),
        }))}
        columns={columns}
        pageSize={5}
        components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
        loading={studentStatus === "loading" || absenceStatus === "loading"}
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
