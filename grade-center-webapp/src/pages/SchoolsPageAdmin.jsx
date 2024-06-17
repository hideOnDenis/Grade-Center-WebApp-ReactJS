import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import {
  fetchSchools,
  createSchool,
  deleteSchool,
} from "../features/schools/schoolSlice";

export default function SchoolsPageAdmin() {
  const [open, setOpen] = useState(false);
  const [schoolData, setSchoolData] = useState({ name: "", address: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { schools, status, error } = useSelector((state) => state.schools);

  useEffect(() => {
    dispatch(fetchSchools());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    dispatch(createSchool(schoolData))
      .unwrap()
      .then(() => {
        dispatch(fetchSchools());
        setOpen(false);
      })
      .catch((error) => {
        console.error("Failed to create school", error);
      });
  };

  const handleChange = (e) => {
    setSchoolData({ ...schoolData, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    dispatch(deleteSchool(id))
      .unwrap()
      .then(() => {
        dispatch(fetchSchools());
      })
      .catch((error) => {
        console.error("Failed to delete school", error);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "address", headerName: "Address", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const rows = schools.map((school) => ({
    id: school.id,
    name: school.name,
    address: school.address,
  }));

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
          Schools
        </Typography>
        <Box>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add School
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: 8 }}
            color="success"
            onClick={() => navigate("/admin/dashboard")}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Box>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New School</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a school, please enter the name and address of the school
            here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="School Name"
            type="text"
            fullWidth
            variant="standard"
            value={schoolData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="School Address"
            type="text"
            fullWidth
            variant="standard"
            value={schoolData.address}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
