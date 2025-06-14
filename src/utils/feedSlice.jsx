import { createSlice } from "@reduxjs/toolkit";

const feedSlice= createSlice({
    name: "feed",
    initialState: [],
    reducers: {
        addFeed: (state, action) => {
          return  action.payload;
        },
        removeFeed: (state, action) => {
            return state.filter(feed => feed.id !== action.payload.id);
        },
        clearFeed: () => {
            return [];
        }
    }
});
export const { addFeed, removeFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;