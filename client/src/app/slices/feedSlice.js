import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: [],
  },

  reducers: {
    setFeedList: (state, action) => {
      state.feed = action.payload;
    },
    removeUserFromFeed: (state, action) => {
      state.feed = state.feed?.filter((user) => user._id !== action.payload);
    },
  },
});

export const { setFeedList, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
