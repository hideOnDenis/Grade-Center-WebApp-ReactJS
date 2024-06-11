import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import LogoutBtn from "../components/LogoutBtn"; // Ensure this path is correct

export default function StudentDashboard() {
  // Mock data for demonstration
  const studentInfo = {
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
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Student Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={4}>
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
          >
            View Full Schedule
          </Button>
        </Box>
        <LogoutBtn />
      </Box>
    </Box>
  );
}
