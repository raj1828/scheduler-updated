import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reportScheduleReducer from '../selectors/ReportSlice';

export const store = configureStore({
  reducer: {
    reportSchedule: reportScheduleReducer,
  },
});

export const saveStateToStorage = async (state) => {
  try {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.setItem('reportScheduleState', serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const loadStateFromStorage = async () => {
  try {
    const serializedState = await AsyncStorage.getItem('reportScheduleState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state:', error);
    return undefined;
  }
};
