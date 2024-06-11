import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import LogoutBtn from "../components/LogoutBtn";

export default function AdminDashboard() {
  // Mock data for demonstration
  const systemStats = {
    totalUsers: 1024,
  };

  return (
    <Box padding={3} sx={{ position: "relative", minHeight: "100vh" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Total Users
              </Typography>
              <Typography variant="h6">{systemStats.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Users
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Manage Users
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Schools
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Manage Schools
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box marginTop={2} display="flex" justifyContent="flex-end">
        <LogoutBtn />
      </Box>
    </Box>
  );
}
