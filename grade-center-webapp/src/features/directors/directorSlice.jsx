import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const domain = "http://localhost:8082/directors";

// Async thunk to fetch directors
export const fetchDirectors = createAsyncThunk(
  "directors/fetchDirectors",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No token found");
      const response = await axios.get(`${domain}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch directors";
      return rejectWithValue(message);
    }
  }
);

// Async thunk to assign a director to a school
export const assignDirectorToSchool = createAsyncThunk(
  "directors/assignDirectorToSchool",
  async ({ directorId, schoolId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No token found");
      const response = await axios.post(
        `${domain}/directorId=${directorId}/schoolId=${schoolId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to assign director to school";
      return rejectWithValue(message);
    }
  }
);

const directorSlice = createSlice({
  name: "directors",
  initialState: {
    directors: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDirectors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDirectors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.directors = action.payload;
      })
      .addCase(fetchDirectors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(assignDirectorToSchool.pending, (state) => {
        state.status = "loading";
      })
      .addCase(assignDirectorToSchool.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(assignDirectorToSchool.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default directorSlice.reducer;
