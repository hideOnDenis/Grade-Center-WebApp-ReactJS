import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../features/teachers/teacherSlice";
import { fetchStudents } from "../features/students/studentSlice";
import UserInfo from "../components/UserInfo";

export default function DirectorDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teachers, status: teacherStatus } = useSelector(
    (state) => state.teachers
  );
  const { students, status: studentStatus } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <Box padding={3} sx={{ position: "relative", minHeight: "100vh" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Director Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Total Teachers
              </Typography>
              <Typography variant="h6">
                {teacherStatus === "loading" ? "Loading..." : teachers.length}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={() => navigate("/director/teachers")}
              >
                See All Teachers
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Total Students
              </Typography>
              <Typography variant="h6">
                {studentStatus === "loading" ? "Loading..." : students.length}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={() => navigate("/director/students")}
              >
                See All Students
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <UserInfo />
    </Box>
  );
}
