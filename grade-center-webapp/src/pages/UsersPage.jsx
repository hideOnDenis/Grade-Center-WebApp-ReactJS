import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function UsersPage() {
  const navigate = useNavigate(); // Initialize the navigate function

  // Static columns definition for display purposes
  const columns = [
    { field: "email", headerName: "Email", width: 200 },
    { field: "isAdmin", headerName: "Is Admin?", width: 130 },
  ];

  // Static rows data for display purposes
  const rows = [
    { id: 1, email: "user@example.com", isAdmin: "Yes" },
    { id: 2, email: "anotheruser@example.com", isAdmin: "No" },
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
          Users
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/admin/dashboard")} // Add onClick handler to navigate
        >
          Back to Dashboard
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
      />
    </Box>
  );
}
