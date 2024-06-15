// absenceSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const domain = "http://localhost:8082";

// Async thunk to fetch absences by student
export const fetchAbsencesByStudent = createAsyncThunk(
  "absences/fetchAbsencesByStudent",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${domain}/absences/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch absences";
      return rejectWithValue(message);
    }
  }
);

const absenceSlice = createSlice({
  name: "absences",
  initialState: {
    absences: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbsencesByStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAbsencesByStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.absences = action.payload;
      })
      .addCase(fetchAbsencesByStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default absenceSlice.reducer;
