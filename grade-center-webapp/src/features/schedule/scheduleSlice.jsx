// scheduleSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const domain = "http://localhost:8082";

// Async thunk to fetch the schedule
export const fetchSchedule = createAsyncThunk(
  "schedule/fetchSchedule",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No token found");
      const response = await axios.get(`${domain}/schedule`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch schedule";
      return rejectWithValue(message);
    }
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    schedule: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedule.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.schedule = action.payload;
      })
      .addCase(fetchSchedule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default scheduleSlice.reducer;
