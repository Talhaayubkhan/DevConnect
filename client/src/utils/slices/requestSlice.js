import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,

  reducers: {
    showRequests: (state, action) => {
      return action.payload;
    },
    removeConnectionRequestById: (state, action) => {
      return state.filter((request) => request._id !== action.payload);
    },
  },
});

export const { showRequests, removeConnectionRequestById } =
  requestSlice.actions;
export default requestSlice.reducer;
