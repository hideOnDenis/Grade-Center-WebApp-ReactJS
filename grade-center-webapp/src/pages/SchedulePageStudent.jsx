import React, { useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchedule } from "../features/schedule/scheduleSlice";

export default function SchedulePageStudent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { schedule, status } = useSelector((state) => state.schedule);

  useEffect(() => {
    dispatch(fetchSchedule());
  }, [dispatch]);

  // Transform the schedule data to the format required by the component
  const transformedSchedule = schedule.reduce((acc, item) => {
    const dayIndex = acc.findIndex((day) => day.day === item.weekday);
    const classDetail = {
      time: `${item.schoolHour.hour}:${item.schoolHour.minute < 10 ? "0" : ""}${
        item.schoolHour.minute
      }`,
      subject: item.courseName,
      teacher: item.studyGroupName,
    };

    if (dayIndex === -1) {
      acc.push({
        day: item.weekday,
        classes: [classDetail],
      });
    } else {
      acc[dayIndex].classes.push(classDetail);
    }

    return acc;
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/student/dashboard")}
        >
          Back to Dashboard
        </Button>
      </Box>
      <Typography variant="h4" component="h2" sx={{ padding: 2 }}>
        Weekly Schedule
      </Typography>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="schedule table" sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Teacher</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {status === "loading" && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {status === "succeeded" &&
              transformedSchedule.map((daySchedule, dayIndex) =>
                daySchedule.classes.map((classDetail, classIndex) => (
                  <TableRow key={`${dayIndex}-${classIndex}`}>
                    {classIndex === 0 && (
                      <TableCell rowSpan={daySchedule.classes.length}>
                        {daySchedule.day}
                      </TableCell>
                    )}
                    <TableCell>{classDetail.time}</TableCell>
                    <TableCell>{classDetail.subject}</TableCell>
                    <TableCell>{classDetail.teacher}</TableCell>
                  </TableRow>
                ))
              )}
            {status === "failed" && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Failed to load schedule
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
