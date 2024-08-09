import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
