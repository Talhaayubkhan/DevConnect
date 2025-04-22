import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import feedReducer from "../slices/feedSlice";
import connectionReducer from "../slices/connectionSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
  },
});

export default appStore;
