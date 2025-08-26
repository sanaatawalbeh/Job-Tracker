import { createSlice } from "@reduxjs/toolkit";

const adminApplicationsSlice = createSlice({
  name: "adminApplications",
  initialState: {
    applications: [],
  },
  reducers: {
    setAdminApplications: (state, action) => {
      state.applications = action.payload;
    },
    updateAdminApplication: (state, action) => {
      const { id, newStatus } = action.payload;
      state.applications = state.applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      );
    },
    deleteAdminApplication: (state, action) => {
      state.applications = state.applications.filter(
        (app) => app.id !== action.payload
      );
    },
  },
});

export const {
  setAdminApplications,
  updateAdminApplication,
  deleteAdminApplication,
} = adminApplicationsSlice.actions;

export default adminApplicationsSlice.reducer;
