import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import usersReducer from "./usersSlice";

const store = configureStore({
  reducer: {
    authData: authReducer,
    usersData: usersReducer,
  },
});

export default store;
