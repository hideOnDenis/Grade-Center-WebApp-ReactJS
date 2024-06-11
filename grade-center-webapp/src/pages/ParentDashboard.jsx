import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

export default function ParentDashboard() {
  const childPerformance = {
    name: "John Doe",
    recentGrades: ["A", "A-", "B+", "A"],
    nextClass: "Mathematics at 10 AM",
  };

  const scheduleItems = [
    { time: "Monday 10 AM", detail: "Math Class" },
    { time: "Tuesday 2 PM", detail: "Physics Class" },
    { time: "Wednesday 1 PM", detail: "History Class" },
  ];

  const handleViewAllGrades = () => {
    console.log("View all grades clicked");
  };

  const handleViewFullSchedule = () => {
    console.log("See full schedule clicked");
    // Here you would typically handle navigation to the full schedule page
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Parent Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Child's Recent Performance
              </Typography>
              <Typography variant="h6">
                Name: {childPerformance.name}
              </Typography>
              <Typography>
                Recent Grades: {childPerformance.recentGrades.join(", ")}
              </Typography>
              <Typography>Next Class: {childPerformance.nextClass}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleViewAllGrades}
                sx={{ mt: 2 }}
              >
                Check All Grades
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Schedule
              </Typography>
              <List>
                {scheduleItems.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item.detail} secondary={item.time} />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                color="primary"
                onClick={handleViewFullSchedule}
                sx={{ mt: 2 }}
              >
                See Full Schedule
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
