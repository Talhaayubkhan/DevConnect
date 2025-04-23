import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,

  reducers: {
    showRequests: (state, action) => {
      return action.payload;
    },
  },
});

export const { showRequests } = requestSlice.actions;
export default requestSlice.reducer;
