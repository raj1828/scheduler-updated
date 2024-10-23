import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: [],
  isLoggedIn: null,
  reportTypes: [],
  selectedVehicles: [],
  emailIds: [],
  selectedTime: '',
  skipWeekends: false,
  interval: '',
  selectedDay: '',
  selectedDate: '',
  scheduleUserEmail: '', // Add this field to the initial state
  currentModalStep: 'edit',
  
};

const reportScheduleSlice = createSlice({
  name: 'reportSchedule',
  initialState,
  reducers: {
    setReportTypes: (state, action) => {
      state.reportTypes = action.payload;
    },
    setSelectedVehicles: (state, action) => {
      state.selectedVehicles = action.payload;
    },
    setEmailIds: (state, action) => {
      state.emailIds = action.payload;
    },
    setScheduleDetails: (state, action) => {
      // Make sure to update scheduleUserEmail here
      return { ...state, ...action.payload };
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    register: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setModalStep: (state, action) => {
      state.currentModalStep = action.payload;
    },
    resetSchedule: () => initialState,
  },
});

export const {
  setReportTypes,
  setSelectedVehicles,
  setEmailIds,
  setScheduleDetails,
  resetSchedule,
  login, logout, register,
  setModalStep
} = reportScheduleSlice.actions;

export default reportScheduleSlice.reducer;
