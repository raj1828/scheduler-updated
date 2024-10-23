import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useSelector, useDispatch } from 'react-redux';
import { saveStateToStorage, store } from '../store/store';
import { setScheduleDetails } from '../selectors/ReportSlice';

import DaySelector from './DaySelector';
import DateSelector from './DateSelector';

const IntervalSelector = ({ selectedInterval, onIntervalChange}) => {
  //selectedDate: scheduleState.selectedDate ? new Date(scheduleState.selectedDate) : new Date(),
 // const [selectedDate, setSelectedDate] = useState(new Date())

 const dispatch = useDispatch();
 // Get schedule and logged-in user's email
 const scheduleState = useSelector(state => state.reportSchedule);
 //const loggedInUserEmail = useSelector(state => state.auth.user?.email); // Get logged-in user's email from authSlice

 const [localState, setLocalState] = useState({
   selectedTime: scheduleState.selectedTime || '9:00 AM',
   skipWeekends: scheduleState.skipWeekends || false,
   interval: scheduleState.interval || 'weekly',
   selectedDay: scheduleState.selectedDay || 'Monday',
   selectedDate: scheduleState.selectedDate ? new Date(scheduleState.selectedDate) : new Date(),
 });

//  const handelLocalState = (key, value) => {
//   console.log("current",key, value)
//   console.log("prev",scheduleState)
//   setLocalState(prevState => ({ ...prevState, [key]: value }));
//   console.log('localstete', localState.selectedDay)
//  }
const handelLocalState = (key, value) => {
  setLocalState(prevState => {
      const updatedState = { ...prevState, [key]: value };
      
      // Dispatch updated state to Redux
      const update = { ...scheduleState, ...updatedState };
      dispatch(setScheduleDetails(update));
      saveStateToStorage(store.getState());

      return updatedState;
  });
};
//  const handleLocalStateChange = (key, value) => {
//   const local = setLocalState(prevState => ({ ...prevState, [key]: value }));
//   console.log('locallll',local)
  
//   const update = {
//     ...localState, local
//   }

//    dispatch(setScheduleDetails(update));
//     saveStateToStorage(store.getState());
//    // onSave();
//    console.log('Date', store.getState())
//  };
const handleLocalStateChange = (key, value) => {
  // Update local state
  setLocalState(prevState => {
      const updatedState = { ...prevState, [key]: value };

      // Dispatch the updated state to Redux
      const update = { ...scheduleState, ...updatedState };
      dispatch(setScheduleDetails(update));

      // Save to local storage after dispatch
      saveStateToStorage(store.getState());

      return updatedState;
  });
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Interval:</Text>

      {/* Weekly Button */}
      <TouchableOpacity
        style={[styles.button, selectedInterval === 'weekly' && styles.selectedButton]}
        onPress={() => onIntervalChange('weekly')}
      >
        <Ionicons
          name={selectedInterval === 'weekly' ? 'stop-circle-outline' : 'ellipse-outline'}
          size={24}
          color="#193893"
        />
        <Text style={[styles.buttonText, selectedInterval === 'weekly' && styles.selectedButtonText]}>
          Weekly
        </Text>
      </TouchableOpacity>
      {/* Show DaySelector or DateSelector based on selectedInterval */}
      {(selectedInterval === 'weekly') && (
        <DaySelector
          selectedDay={localState.selectedDay}
          onDayChange={(day) => handleLocalStateChange('selectedDay', day)}
        />
      )}

      {/* Every Two Weeks Button */}
      <TouchableOpacity
        style={[styles.button, selectedInterval === 'every two weeks' && styles.selectedButton]}
        onPress={() => onIntervalChange('every two weeks')}
      >
        <Ionicons
          name={selectedInterval === 'every two weeks' ? 'stop-circle-outline' : 'ellipse-outline'}
          size={24}
          color="#193893"
        />
        <Text style={[styles.buttonText, selectedInterval === 'every two weeks' && styles.selectedButtonText]}>
          Every Two Weeks
        </Text>
      </TouchableOpacity>

      {( selectedInterval === 'every two weeks') && (
        <DaySelector
          selectedDay={localState.selectedDay}
          onDayChange={(day) => handleLocalStateChange('selectedDay', day)}
        />
      )}

      {/* Monthly Button */}
      <TouchableOpacity
        style={[styles.button, selectedInterval === 'monthly' && styles.selectedButton]}
        onPress={() => onIntervalChange('monthly')}
      >
        <Ionicons
          name={selectedInterval === 'monthly' ? 'stop-circle-outline' : 'ellipse-outline'}
          size={24}
          color="#193893"
        />
        <Text style={[styles.buttonText, selectedInterval === 'monthly' && styles.selectedButtonText]}>
          Monthly
        </Text>
      </TouchableOpacity>
      {(selectedInterval === 'monthly' ) && (
        <DateSelector
          selectedDate={localState.selectedDate}
          onDateChange={(date) => handleLocalStateChange('selectedDate', date)}
        />
      )}

      {/* Quarterly Button */}
      <TouchableOpacity
        style={[styles.button, selectedInterval === 'quarterly' && styles.selectedButton]}
        onPress={() => onIntervalChange('quarterly')}
      >
        <Ionicons
          name={selectedInterval === 'quarterly' ? 'stop-circle-outline' : 'ellipse-outline'}
          size={24}
          color="#193893"
        />
        <Text style={[styles.buttonText, selectedInterval === 'quarterly' && styles.selectedButtonText]}>
          Quarterly
        </Text>
      </TouchableOpacity>
      {( selectedInterval === 'quarterly') && (
        <DateSelector
          selectedDate={localState.selectedDate}
          onDateChange={(date) => handleLocalStateChange('selectedDate', date)}
        />
      )}

      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 8,
    marginBottom: 1,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#d3e0ff',
  },
  buttonText: {
    color: '#193893',
    fontSize: 16,
    marginLeft: 10,
  },
  selectedButtonText: {
    fontWeight: 'bold',
    color: '#193893',
  },
});

export default IntervalSelector;
