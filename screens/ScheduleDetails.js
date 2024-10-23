import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { saveStateToStorage, store } from '../store/store';
import { setScheduleDetails } from '../selectors/ReportSlice';
import SelectedParametersDropdown from '../components/SelectedParametersComponent';
import TimeSelector from '../components/TimeSelectComponent';
import IntervalSelector from '../components/SelectInterval';
import WeekendSkipToggle from '../components/SkipToggle';

const ScheduleDetailsComponent = ({ onCancel,onSave }) => {
  const dispatch = useDispatch();

  // Get schedule and logged-in user's email
  const scheduleState = useSelector(state => state.reportSchedule);
  //const loggedInUserEmail = useSelector(state => state.auth.user?.email); // Get logged-in user's email from authSlice

  const [localState, setLocalState] = useState({
    selectedTime: scheduleState.selectedTime || '9:00 AM',
    interval: scheduleState.interval || 'weekly',
    skipWeekends: scheduleState.skipWeekends || false,
    // selectedDay: scheduleState.selectedDay || 'Monday',
    // selectedDate: scheduleState.selectedDate? new Date(scheduleState.selectedDate) : new Date(),
    
  });

  const handleSave = () => {
    const updatedState = {
      ...localState,
      // selectedDate: localState.selectedDate.toISOString(),
      //scheduleUserEmail: loggedInUserEmail,  // Include logged-in user's email
    };
    dispatch(setScheduleDetails(updatedState));
    saveStateToStorage(store.getState());
    onSave();
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleLocalStateChange = (key, value) => {
    setLocalState(prevState => ({ ...prevState, [key]: value }));
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Schedule Details</Text>
        <SelectedParametersDropdown />
        <TimeSelector
          selectedTime={localState.selectedTime}
          onTimeChange={(time) => handleLocalStateChange('selectedTime', time)}
        />
        <IntervalSelector  
          skipWeekends={localState.skipWeekends}
          selectedInterval={localState.interval}
          onIntervalChange={(interval) => handleLocalStateChange('interval', interval)}
        />
        
        {/* {(localState.interval === 'weekly' || localState.interval === 'every two weeks') && (
          <DaySelector
            selectedDay={localState.selectedDay}
            onDayChange={(day) => handleLocalStateChange('selectedDay', day)}
          />
        )}
        {(localState.interval === 'monthly' || localState.interval === 'quarterly') && (
          <DateSelector
            selectedDate={localState.selectedDate}
            onDateChange={(date) => handleLocalStateChange('selectedDate', date)}
          />
        )} */}
        <WeekendSkipToggle
          skipWeekends={localState.skipWeekends}
          onToggle={(skip) => handleLocalStateChange('skipWeekends', skip)}
        />
      </ScrollView>
      <View style={styles.footerButton}>
        <TouchableOpacity style={styles.cancleButton} onPress={handleCancel}>
          <Text style={styles.cancleButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.proceedButton} onPress={handleSave}>
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#193893',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  proceedButton: {
    width: '49%',
    backgroundColor: '#193893',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  cancleButton: {
    width: '49%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 5,
    borderWidth: 1,
  },
  proceedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cancleButtonText: {
    color: '#193893',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default ScheduleDetailsComponent;
