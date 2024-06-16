// parentSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const domain = "http://localhost:8082";

// Async thunk to fetch parent data
export const fetchParentData = createAsyncThunk(
  "parent/fetchParentData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No token found");
      const response = await axios.get(`${domain}/parents/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch parent data";
      return rejectWithValue(message);
    }
  }
);

const parentSlice = createSlice({
  name: "parent",
  initialState: {
    parentData: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParentData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchParentData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.parentData = action.payload;
      })
      .addCase(fetchParentData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default parentSlice.reducer;
