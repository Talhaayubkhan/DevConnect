import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,

  reducers: {
    showConnections: (state, action) => action.payload,
    removeConnection: (state) => state.null,
  },
});

export const { showConnections, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
