import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function UsersPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    role: "",
  });

  // Updated columns with User ID and Role
  const columns = [
    { field: "id", headerName: "User ID", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 130 },
  ];

  // Updated rows with role data
  const rows = [
    { id: 1, email: "user@example.com", role: "Admin" },
    { id: 2, email: "anotheruser@example.com", role: "User" },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    console.log(userData);
    handleClose();
  };

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
        <Box>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/admin/dashboard")}
            sx={{ marginRight: 2 }}
          >
            Back to Dashboard
          </Button>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Register New User
          </Button>
        </Box>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={userData.username}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={userData.password}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={userData.role}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="director">Director</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="parent">Parent</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
