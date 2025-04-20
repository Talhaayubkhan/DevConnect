import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: null,
  },

  reducers: {
    addFeed: (state, action) => {
      state.feed = action.payload;
    },
    clearFeed: (state) => {
      state.feed = null;
    },
  },
});

export const { addFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
