import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("authState"));

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    editProfile(state, action) {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
});

export const editActions = editSlice.actions;
export default editSlice;
