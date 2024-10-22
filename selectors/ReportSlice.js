import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user :[],
  isLoggedIn: null,
  reportTypes: [],
  selectedVehicles: [],
  emailIds: [],
  selectedTime: '',
  skipWeekends: false,
  interval: '',
  selectedDay: '',
  selectedDate: '',
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
        console.log(state)
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
  login,logout,register,
} = reportScheduleSlice.actions;

export default reportScheduleSlice.reducer;