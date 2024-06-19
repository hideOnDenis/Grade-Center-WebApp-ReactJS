import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudyGroups,
  createStudyGroup,
} from "../features/study groups/groupSlice";
import { fetchSchools } from "../features/schools/schoolSlice";

export default function StudyGroupsAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studyGroups, status: studyGroupStatus } = useSelector(
    (state) => state.groups
  );
  const { schools, status: schoolStatus } = useSelector(
    (state) => state.schools
  );
  const [open, setOpen] = useState(false);
  const [groupData, setGroupData] = useState({ name: "", schoolId: "" });

  useEffect(() => {
    dispatch(fetchStudyGroups());
    dispatch(fetchSchools());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(createStudyGroup(groupData))
      .unwrap()
      .then(() => {
        dispatch(fetchStudyGroups());
        setOpen(false);
      })
      .catch((error) => {
        console.error("Failed to create study group", error);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
  ];

  const rows = studyGroups.map((group) => ({
    id: group.id,
    name: group.name,
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
          Study Groups
        </Typography>
        <Box>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Study Group
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
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
        loading={studyGroupStatus === "loading"}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Study Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Group Name"
            type="text"
            fullWidth
            variant="standard"
            value={groupData.name}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>School</InputLabel>
            <Select
              name="schoolId"
              value={groupData.schoolId}
              onChange={handleChange}
              label="School"
            >
              {schools.map((school) => (
                <MenuItem key={school.id} value={school.id}>
                  {school.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
