import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function UsersPage() {
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
        {/* Placeholder button, does nothing */}
        <Button variant="contained" color="success">
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
