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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsBySchoolId } from "../features/students/studentSlice";
import { fetchTeacherDetails } from "../features/teachers/teacherSlice";
import {
  fetchAllAbsences,
  deleteAbsence,
  addAbsence,
} from "../features/absences/absenceSlice";
import {
  fetchGradesByStudentId,
  createGrade,
  deleteGrade,
} from "../features/grades/gradeSlice";
import { fetchStudentCourses } from "../features/courses/courseSlice";

export default function StudentsPageTeacher() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { students, status: studentStatus } = useSelector(
    (state) => state.students
  );
  const { absences, status: absenceStatus } = useSelector(
    (state) => state.absence
  );
  const { teacherDetails, status: teacherStatus } = useSelector(
    (state) => state.teachers
  );
  const { studentCourses } = useSelector((state) => state.course);
  const { grades } = useSelector((state) => state.grades);

  const [openGrade, setOpenGrade] = useState(false);
  const [openAbsence, setOpenAbsence] = useState(false);
  const [openDeleteGrade, setOpenDeleteGrade] = useState(false);
  const [gradeData, setGradeData] = useState({
    studentId: "",
    grade: "",
    courseId: "",
  });
  const [absenceData, setAbsenceData] = useState({
    studentId: "",
    date: "",
    courseId: "",
  });
  const [selectedStudentId, setSelectedStudentId] = useState("");

  useEffect(() => {
    dispatch(fetchTeacherDetails());
  }, [dispatch]);

  useEffect(() => {
    if (teacherDetails && teacherDetails.schoolId) {
      dispatch(fetchStudentsBySchoolId(teacherDetails.schoolId));
      dispatch(fetchAllAbsences());
    }
  }, [dispatch, teacherDetails]);

  const countStudentAbsences = (studentId) => {
    if (!absences) return 0;
    return absences.filter((absence) => absence.studentId === studentId).length;
  };

  const handleDeleteAbsence = (absenceId) => {
    dispatch(deleteAbsence(absenceId))
      .unwrap()
      .then(() => {
        dispatch(fetchAllAbsences()); // Refresh absences after deletion
      })
      .catch((error) => {
        console.error("Failed to delete absence", error);
      });
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
            onClick={() => handleOpenDeleteGrade(params.row.id)}
          >
            Delete Grade
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteAbsence(params.row.id)}
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
    dispatch(fetchStudentCourses(student.id)); // Fetch courses for the student
    setOpenGrade(true);
  };

  const handleCloseGrade = () => setOpenGrade(false);

  const handleOpenAbsence = (student) => {
    setAbsenceData({ ...absenceData, studentId: student.id });
    dispatch(fetchStudentCourses(student.id)); // Fetch courses for the student
    setOpenAbsence(true);
  };

  const handleCloseAbsence = () => setOpenAbsence(false);

  const handleOpenDeleteGrade = (studentId) => {
    setSelectedStudentId(studentId);
    dispatch(fetchGradesByStudentId(studentId)); // Fetch grades for the student
    setOpenDeleteGrade(true);
  };

  const handleCloseDeleteGrade = () => setOpenDeleteGrade(false);

  const handleGradeChange = (event) => {
    const { name, value } = event.target;
    setGradeData({ ...gradeData, [name]: value });
  };

  const handleAbsenceChange = (event) => {
    const { name, value } = event.target;
    setAbsenceData({ ...absenceData, [name]: value });
  };

  const handleGradeSubmit = () => {
    dispatch(createGrade(gradeData))
      .unwrap()
      .then(() => {
        dispatch(fetchGradesByStudentId(gradeData.studentId));
        handleCloseGrade();
      })
      .catch((error) => {
        console.error("Failed to create grade", error);
      });
  };

  const handleAbsenceSubmit = () => {
    dispatch(addAbsence(absenceData))
      .unwrap()
      .then(() => {
        dispatch(fetchAllAbsences());
        handleCloseAbsence();
      })
      .catch((error) => {
        console.error("Failed to add absence", error);
      });
  };

  const handleDeleteGrade = (gradeId) => {
    dispatch(deleteGrade(gradeId))
      .unwrap()
      .then(() => {
        dispatch(fetchGradesByStudentId(selectedStudentId));
        handleCloseDeleteGrade();
      })
      .catch((error) => {
        console.error("Failed to delete grade", error);
      });
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
          <FormControl fullWidth margin="dense">
            <InputLabel>Course</InputLabel>
            <Select
              name="courseId"
              value={gradeData.courseId}
              onChange={handleGradeChange}
              label="Course"
            >
              {studentCourses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <FormControl fullWidth margin="dense">
            <InputLabel>Course</InputLabel>
            <Select
              name="courseId"
              value={absenceData.courseId}
              onChange={handleAbsenceChange}
              label="Course"
            >
              {studentCourses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAbsence}>Cancel</Button>
          <Button onClick={handleAbsenceSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteGrade} onClose={handleCloseDeleteGrade}>
        <DialogTitle>Delete Grade</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Grade</InputLabel>
            <Select
              name="gradeId"
              value={gradeData.gradeId}
              onChange={(e) => handleDeleteGrade(e.target.value)}
              label="Grade"
            >
              {grades.map((grade) => (
                <MenuItem key={grade.id} value={grade.id}>
                  {`Course: ${grade.courseId}, Grade: ${grade.grade}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteGrade}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
