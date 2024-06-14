// absenceSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const domain = "http://localhost:8082/api/v1/auth";

// Async thunk to fetch absences
export const fetchAbsences = createAsyncThunk(
  "absences/fetchAbsences",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${domain}/absences`);
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
      .addCase(fetchAbsences.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAbsences.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.absences = action.payload;
      })
      .addCase(fetchAbsences.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default absenceSlice.reducer;
