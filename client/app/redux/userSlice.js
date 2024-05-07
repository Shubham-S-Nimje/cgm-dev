import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userDataSlice = createSlice({
  name: "UserData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
