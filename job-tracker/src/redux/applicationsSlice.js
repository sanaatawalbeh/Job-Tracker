// src/redux/applicationsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    list: [],
  },
  reducers: {
    setApplications: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setApplications } = applicationsSlice.actions;
export default applicationsSlice.reducer;
