import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function TeachersPage() {
  const navigate = useNavigate();
  const [teachers] = useState([
    { id: 1, email: "teacher1@example.com", name: "John Doe" },
    { id: 2, email: "teacher2@example.com", name: "Jane Smith" },
    { id: 3, email: "teacher3@example.com", name: "Emily Johnson" },
  ]);

  const columns = [
    { field: "id", headerName: "Teacher ID", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
  ];

  return (
    <Box sx={{ height: "calc(100vh - 64px - 16px - 16px)", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Teachers
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/director/dashboard")}
        >
          Back to Dashboard
        </Button>
      </Box>
      <DataGrid
        rows={teachers}
        columns={columns}
        pageSize={5}
        components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
      />
    </Box>
  );
}
