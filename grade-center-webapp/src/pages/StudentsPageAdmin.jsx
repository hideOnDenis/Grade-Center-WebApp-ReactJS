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
import {
  fetchAllAbsences,
  deleteAbsence,
} from "../features/absences/absenceSlice";

export default function StudentsPageAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { students, status: studentStatus } = useSelector(
    (state) => state.students
  );
  const { absences, status: absenceStatus } = useSelector(
    (state) => state.absence
  );
  const [openAssignParent, setOpenAssignParent] = useState(false);
  const [parentData, setParentData] = useState({
    studentId: "",
    parent: "",
  });

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchAllAbsences());
  }, [dispatch]);

  const countStudentAbsences = (studentId) => {
    if (!absences) return 0;
    return absences.filter((absence) => absence.studentId === studentId).length;
  };

  const columns = [
    { field: "username", headerName: "Name", width: 200 },
    {
      field: "parents",
      headerName: "Parents",
      width: 300,
      renderCell: (params) =>
        Array.isArray(params.value) ? params.value.join(", ") : "None",
    },
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
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenAssignParent(params.row)}
        >
          Assign Parent
        </Button>
      ),
    },
  ];

  const handleOpenAssignParent = (student) => {
    setParentData({ ...parentData, studentId: student.id });
    setOpenAssignParent(true);
  };

  const handleCloseAssignParent = () => setOpenAssignParent(false);

  const handleParentChange = (event) => {
    const { name, value } = event.target;
    setParentData({ ...parentData, [name]: value });
  };

  const handleParentSubmit = () => {
    console.log("Assigning parent data:", parentData); // Debugging log
    // Implement the submit logic here
    handleCloseAssignParent();
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
          onClick={() => navigate("/admin/dashboard")}
        >
          Back to Dashboard
        </Button>
      </Box>
      <DataGrid
        rows={students.map((student) => ({
          id: student.id,
          username: student.username,
          parents: student.parent,
          grades: student.courses.flatMap((course) => course.grades),
          absences: countStudentAbsences(student.id),
        }))}
        columns={columns}
        pageSize={5}
        components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
        loading={studentStatus === "loading" || absenceStatus === "loading"}
      />

      <Dialog open={openAssignParent} onClose={handleCloseAssignParent}>
        <DialogTitle>Assign Parent</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="parent"
            label="Parent Name"
            type="text"
            fullWidth
            variant="standard"
            value={parentData.parent}
            onChange={handleParentChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignParent}>Cancel</Button>
          <Button onClick={handleParentSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
