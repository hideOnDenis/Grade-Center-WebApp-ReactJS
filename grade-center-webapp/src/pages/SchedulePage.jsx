import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function SchedulePage() {
  // Static schedule data
  const schedule = [
    {
      day: "Monday",
      classes: [
        { time: "09:00 - 10:00", subject: "Mathematics", teacher: "Mr. Smith" },
        { time: "10:15 - 11:15", subject: "History", teacher: "Ms. Jones" },
        { time: "11:30 - 12:30", subject: "Physics", teacher: "Dr. Brown" },
      ],
    },
    {
      day: "Tuesday",
      classes: [
        { time: "09:00 - 10:00", subject: "Biology", teacher: "Dr. Allen" },
        {
          time: "10:15 - 11:15",
          subject: "Physical Education",
          teacher: "Coach Carter",
        },
        {
          time: "11:30 - 12:30",
          subject: "English Literature",
          teacher: "Ms. Wilson",
        },
      ],
    },
    {
      day: "Wednesday",
      classes: [
        { time: "09:00 - 10:00", subject: "Chemistry", teacher: "Dr. Clark" },
        {
          time: "10:15 - 11:15",
          subject: "Social Studies",
          teacher: "Ms. Davis",
        },
        { time: "11:30 - 12:30", subject: "Art", teacher: "Mr. Thompson" },
      ],
    },
    {
      day: "Thursday",
      classes: [
        {
          time: "09:00 - 10:00",
          subject: "Computer Science",
          teacher: "Mr. Lopez",
        },
        {
          time: "10:15 - 11:15",
          subject: "Business Studies",
          teacher: "Ms. Taylor",
        },
        { time: "11:30 - 12:30", subject: "Music", teacher: "Mrs. Lee" },
      ],
    },
    {
      day: "Friday",
      classes: [
        { time: "09:00 - 10:00", subject: "Economics", teacher: "Mr. Hill" },
        {
          time: "10:15 - 11:15",
          subject: "Physical Education",
          teacher: "Coach Carter",
        },
        { time: "11:30 - 12:30", subject: "French", teacher: "Ms. Martin" },
      ],
    },
  ];

  return (
    <Paper sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <Typography variant="h4" component="h2" sx={{ padding: 2 }}>
        Weekly Schedule
      </Typography>
      <TableContainer>
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
            {schedule.map((daySchedule, dayIndex) =>
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
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
