import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.jsx";
import userReducer from "../features/users/userSlice.jsx";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },

});
