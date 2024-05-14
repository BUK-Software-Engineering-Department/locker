import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("authState")) || {
  user: null,
  isLoggedIn: false,
  isRegistered: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isRegistered = true;
      state.isLoggedIn = true;
      state.isAdmin = false;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    loginAdmin(state, action) {
      state.user = action.payload;
      state.isRegistered = true;
      state.isLoggedIn = true;
      state.isAdmin = true;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout(state) {
      state.user = null;
      state.isRegistered = null;
      state.isLoggedIn = false;
      localStorage.removeItem("authState");
    },
    registered(state) {
      state.isRegistered = true;
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
