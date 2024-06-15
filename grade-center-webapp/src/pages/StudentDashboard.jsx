import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import UserInfo from "../components/UserInfo"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbsencesByStudent } from "../features/absences/absenceSlice"; // Adjust the import path as necessary

export default function StudentDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { absences, status } = useSelector(
    (state) => state.absences || { absences: [], status: "idle" }
  );
  const [studentInfo, setStudentInfo] = useState({
    grades: {
      recent: "A",
      average: "B+",
    },
    nextClass: {
      name: "Mathematics",
      time: "10:00 AM - 11:00 AM",
    },
    assignments: {
      total: 3,
      pending: 2,
    },
    absences: {
      total: 0,
    },
  });

  useEffect(() => {
    dispatch(fetchAbsencesByStudent())
      .unwrap()
      .then((fetchedAbsences) => {
        setStudentInfo((prevInfo) => ({
          ...prevInfo,
          absences: { total: fetchedAbsences.length },
        }));
      })
      .catch((error) => {
        console.error("Failed to fetch absences", error);
      });
  }, [dispatch]);

  return (
    <Box padding={3} sx={{ position: "relative", minHeight: "100vh" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Student Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Recent Grade
              </Typography>
              <Typography variant="h6">{studentInfo.grades.recent}</Typography>
              <Typography color="text.secondary">
                Average Grade: {studentInfo.grades.average}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Next Class
              </Typography>
              <Typography variant="h6">{studentInfo.nextClass.name}</Typography>
              <Typography color="text.secondary">
                Time: {studentInfo.nextClass.time}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Assignments
              </Typography>
              <Typography variant="h6">
                Pending: {studentInfo.assignments.pending}
              </Typography>
              <Typography color="text.secondary">
                Total: {studentInfo.assignments.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Absences
              </Typography>
              <Typography variant="h6">{studentInfo.absences.total}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/student/absences")} // Ensure this matches the correct route
                sx={{ mt: 2 }}
              >
                View All Absences
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box marginTop={2} display="flex" justifyContent="space-between">
        <Box>
          <Button variant="contained" color="primary">
            View All Grades
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "10px" }}
            onClick={() => navigate("/student/schedule")} // Ensure this matches the correct route
          >
            View Full Schedule
          </Button>
        </Box>
        <UserInfo />
      </Box>
    </Box>
  );
}
