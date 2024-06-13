import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import UserInfo from "../components/UserInfo"; // Import UserInfo component

export default function DirectorDashboard() {
  const navigate = useNavigate();

  const directorInfo = {
    totalTeachers: 75,
    totalStudents: 1500,
    ongoingProjects: 5,
  };

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
              <Typography variant="h6">{directorInfo.totalTeachers}</Typography>
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
              <Typography variant="h6">{directorInfo.totalStudents}</Typography>
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
      {/* <UserInfo /> */}
    </Box>
  );
}
