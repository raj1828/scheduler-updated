import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: null,
  reportTypes: [],
  selectedVehicles: [],
  emailIds: [],
  selectedTime: '',
  skipWeekends: false,
  interval: '',
  selectedDay: '',
  selectedDate: '',
  scheduleUserEmail: '', // Field for the logged-in user's email
  fullData: [], // Field to store all selected parameters data
 currentModalStep: 'view',
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
    scheduleDetails: (state, action) => {
      // Update scheduleUserEmail and fullData here
      // const { email, ...rest } = action.payload;
      // state.scheduleUserEmail = email || state.scheduleUserEmail;
      // state.fullData = { ...state.fullData, ...rest };
      // console.log('fullData', state.fullData);
      return {...state, ...action.payload}
    },
    setFullData:(state, action) => {
      if (!Array.isArray(state.fullData)) {
        state.fullData = [];
      }
      state.fullData.push(action.payload);
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.scheduleUserEmail = action.payload.email; // Set email on login
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.scheduleUserEmail = ''; // Clear email on logout
      //state.fullData = {}; // Clear all data on logout
    },
    register: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.scheduleUserEmail = action.payload.email; // Set email on register
    },
    setModalStep: (state, action) => {
      state.currentModalStep = action.payload;
    },
    resetData: () => initialState,
  },
});

export const {
  setReportTypes,
  setSelectedVehicles,
  setEmailIds,
  scheduleDetails,
  resetData,
  login, 
  logout, 
  register,
  setModalStep,
  setFullData
} = reportScheduleSlice.actions;

export default reportScheduleSlice.reducer;
