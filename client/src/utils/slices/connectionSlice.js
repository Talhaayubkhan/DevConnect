import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: [],

  reducers: {
    setConnectionRequests: (state, action) => action.payload,
  },
});

export const { setConnectionRequests } = connectionSlice.actions;
export default connectionSlice.reducer;
