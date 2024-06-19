import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const domain = "http://localhost:8082/students";

// Async thunk to fetch students with full details
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No token found");
      const response = await axios.get(`${domain}/full`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch students";
      return rejectWithValue(message);
    }
  }
);

// Async thunk to fetch a specific student by ID
export const fetchStudentById = createAsyncThunk(
  "students/fetchStudentById",
  async (studentId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No token found");
      const response = await axios.get(`${domain}/full/id=${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch student details";
      return rejectWithValue(message);
    }
  }
);

// Async thunk to assign a parent to a student
export const assignParentToStudent = createAsyncThunk(
  "students/assignParentToStudent",
  async ({ studentId, parentsID, classesID }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No token found");
      const response = await axios.put(
        `${domain}/id=${studentId}`,
        { parentsID, classesID },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to assign parent to student";
      return rejectWithValue(message);
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    student: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchStudentById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.student = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(assignParentToStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(assignParentToStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Optionally update the students list if necessary
        const updatedStudent = action.payload;
        state.students = state.students.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        );
      })
      .addCase(assignParentToStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
