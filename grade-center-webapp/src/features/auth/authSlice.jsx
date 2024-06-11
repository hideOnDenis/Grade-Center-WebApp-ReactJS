import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const domain = "http://localhost:8082/api/v1/auth";

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${domain}/register`, userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to register";
      return rejectWithValue(message);
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${domain}/login`, credentials);
      localStorage.setItem("accessToken", response.data.access_token); // Save the token to localStorage using the correct key
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to login";
      return rejectWithValue(message);
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token =
        getState().auth.accessToken || localStorage.getItem("accessToken");
      if (!token) {
        console.log("No token found");
        throw new Error("No token found");
      }
      const response = await axios.get(`${domain}/info`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("User loaded", response.data);
      return { user: response.data, accessToken: token };
    } catch (error) {
      console.error("Failed to load user", error);
      return rejectWithValue("Failed to load user");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: Boolean(localStorage.getItem("accessToken")),
    accessToken: localStorage.getItem("accessToken"),
    status: "idle",
    error: null,
  },
  reducers: {
    logoutUser(state) {
      localStorage.removeItem("accessToken");
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state, action) => {
        localStorage.removeItem("accessToken");
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
