import React from "react";
import { Typography, Paper, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SchedulePageParent() {
  const navigate = useNavigate();

  // Example static data for children
  const children = [
    { id: 1, name: "John" },
    { id: 2, name: "Emma" },
  ];

  return (
    <Box sx={{ width: "100%", overflow: "hidden", position: "relative" }}>
      <Typography variant="h4" sx={{ m: 2 }}>
        Children's Weekly Schedules
      </Typography>
      <Button
        variant="contained"
        color="success"
        sx={{ position: "absolute", top: 16, right: 16 }}
        onClick={() => navigate("/parent/dashboard")}
      >
        Back to Dashboard
      </Button>
      {children.map((child) => (
        <Paper key={child.id} elevation={3} sx={{ margin: 2, padding: 2 }}>
          <Typography variant="h5">{child.name}</Typography>
          <Box sx={{ display: "flex", justifyContent: "start", gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate(`/parent/${child.id}/grades`)}
            >
              See Grades
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(`/parent/${child.id}/schedule`)}
            >
              See Full Schedule
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
