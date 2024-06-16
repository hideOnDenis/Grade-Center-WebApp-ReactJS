import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.jsx";
import userReducer from "../features/users/userSlice.jsx";
import teacherReducer from "../features/teachers/teacherSlice.jsx";
import absenceReducer from "../features/absences/absenceSlice.jsx";
import studentReducer from "../features/students/studentSlice.jsx";
import gradeReducer from "../features/grades/gradeSlice.jsx";
import scheduleReducer from "../features/schedule/scheduleSlice.jsx";
import parentReducer from "../features/parents/parentSlice.jsx";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        teacher: teacherReducer,
        absence: absenceReducer,
        students: studentReducer,
        grades: gradeReducer,
        schedule: scheduleReducer,
        parent: parentReducer,
    },

});
