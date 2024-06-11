import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import LogoutBtn from "../components/LogoutBtn";

export default function DirectorDashboard() {
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
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Ongoing Projects
              </Typography>
              <Typography variant="h6">
                {directorInfo.ongoingProjects}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        <LogoutBtn />
      </Box>
    </Box>
  );
}
