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
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";

export default function UsersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [changeRoleOpen, setChangeRoleOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const columns = [
    { field: "id", headerName: "User ID", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
            sx={{ marginRight: 1 }}
          >
            Delete User
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenChangeRole(params.row)}
          >
            Change Role
          </Button>
        </Box>
      ),
    },
  ];

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
    console.log("Submitting user data:", userData); // Debugging log
    dispatch(registerUser(userData))
      .unwrap()
      .then((response) => {
        console.log("User registered successfully", response);
        // Optionally, refresh the user list or show a success message
      })
      .catch((error) => {
        console.error("Failed to register user", error);
        // Optionally, show an error message
      });
    handleClose();
  };

  const handleOpenChangeRole = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setChangeRoleOpen(true);
  };

  const handleChangeRoleClose = () => {
    setChangeRoleOpen(false);
  };

  const handleChangeRoleSubmit = () => {
    console.log("Changing role for user:", selectedUser.id, "to:", newRole);
    // Implement role change logic here
    setChangeRoleOpen(false);
  };

  const handleDelete = (userId) => {
    console.log("Deleting user:", userId);
    // Implement delete logic here
  };

  const handleRoleChange = (event) => {
    setNewRole(event.target.value);
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={changeRoleOpen} onClose={handleChangeRoleClose}>
        <DialogTitle>Change Role</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select value={newRole} label="Role" onChange={handleRoleChange}>
              <MenuItem value="admin">admin</MenuItem>
              <MenuItem value="director">director</MenuItem>
              <MenuItem value="teacher">teacher</MenuItem>
              <MenuItem value="parent">parent</MenuItem>
              <MenuItem value="student">student</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangeRoleClose}>Cancel</Button>
          <Button onClick={handleChangeRoleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
