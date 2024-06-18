import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const domain = "http://localhost:8082";

// Async thunk to fetch course by ID
export const fetchCourseById = createAsyncThunk(
  "course/fetchCourseById",
  async (subjectId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No token found");
      const response = await axios.get(`${domain}/subjects/${subjectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch course";
      return rejectWithValue(message);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    course: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.course = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
