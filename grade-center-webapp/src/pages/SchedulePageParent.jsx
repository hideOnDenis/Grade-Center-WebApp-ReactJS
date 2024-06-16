import React, { useEffect } from "react";
import { Typography, Paper, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchParentData } from "../features/parents/parentSlice";

export default function SchedulePageParent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { parentData, status } = useSelector((state) => state.parent);

  useEffect(() => {
    dispatch(fetchParentData());
  }, [dispatch]);

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
      {status === "loading" && (
        <Typography variant="h6" sx={{ m: 2 }}>
          Loading...
        </Typography>
      )}
      {status === "succeeded" &&
        parentData &&
        parentData.students.map((child) => (
          <Paper
            key={child.userID}
            elevation={3}
            sx={{ margin: 2, padding: 2 }}
          >
            <Typography variant="h5">Student ID: {child.userID}</Typography>
            <Box
              sx={{ display: "flex", justifyContent: "start", gap: 2, mt: 2 }}
            >
              <Button
                variant="contained"
                onClick={() => navigate(`/parent/${child.userID}/grades`)}
              >
                See Grades
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate(`/parent/${child.userID}/schedule`)}
              >
                See Full Schedule
              </Button>
            </Box>
          </Paper>
        ))}
      {status === "failed" && (
        <Typography variant="h6" sx={{ m: 2 }}>
          Failed to load parent data
        </Typography>
      )}
    </Box>
  );
}
