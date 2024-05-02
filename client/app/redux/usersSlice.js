import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const usersListSlice = createSlice({
  name: "UsersList",
  initialState,
  reducers: {
    setUsersList: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUsersList } = usersListSlice.actions;

export default usersListSlice.reducer;
