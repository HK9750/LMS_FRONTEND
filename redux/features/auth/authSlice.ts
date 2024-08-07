import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  activationToken: "",
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action) => {
      state.activationToken = action.payload.token;
    },
    userActivation: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLogin: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    socialLogin: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLogout: (state) => {
      state.accessToken = "";
      state.user = null;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const {
  userRegistration,
  updateAccessToken,
  userActivation,
  userLogin,
  userLogout,
  socialLogin,
} = authSlice.actions;

export default authSlice.reducer;
