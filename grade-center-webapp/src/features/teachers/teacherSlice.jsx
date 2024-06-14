import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const domain = "http://localhost:8082/teachers";

// Async thunk to fetch teachers
export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${domain}`);
      // Transform the response to an array of teachers
      const teachers = response.data.map((teacher) => ({
        id: teacher.id,
        name: teacher.name,
        subject: teacher.subject,
      }));
      return teachers;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch teachers";
      return rejectWithValue(message);
    }
  }
);

// Async thunk to add a new teacher
export const addTeacher = createAsyncThunk(
  "teachers/addTeacher",
  async (teacherData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${domain}`, teacherData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to add teacher";
      return rejectWithValue(message);
    }
  }
);

// Async thunk to update teacher details
export const updateTeacher = createAsyncThunk(
  "teachers/updateTeacher",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${domain}/${id}`, data);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update teacher";
      return rejectWithValue(message);
    }
  }
);

// Async thunk to delete a teacher
export const deleteTeacher = createAsyncThunk(
  "teachers/deleteTeacher",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${domain}/${id}`);
      return { id };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete teacher";
      return rejectWithValue(message);
    }
  }
);

const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addTeacher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers.push(action.payload);
      })
      .addCase(addTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateTeacher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedTeacher = action.payload;
        const existingTeacher = state.teachers.find(
          (teacher) => teacher.id === updatedTeacher.id
        );
        if (existingTeacher) {
          Object.assign(existingTeacher, updatedTeacher);
        }
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteTeacher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers = state.teachers.filter(
          (teacher) => teacher.id !== action.payload.id
        );
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default teacherSlice.reducer;
