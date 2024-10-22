import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { saveStateToStorage, store } from '../store/store';
import { setScheduleDetails } from '../selectors/ReportSlice';
import SelectedParametersDropdown from './SelectedParameters';
import TimeSelector from './SelectTime';
import IntervalSelector from './SelectInterval';
import WeekendSkipToggle from './SkipToggle';
import DaySelector from './DaySelector';
import DateSelector from './DateSelector';

const ScheduleDetailsComponent = ({ onSave }) => {
  const dispatch = useDispatch();
  const scheduleState = useSelector(state => state.reportSchedule);
  const [localState, setLocalState] = useState({
    selectedTime: scheduleState.selectedTime || '9:00 AM',
    skipWeekends: scheduleState.skipWeekends || false,
    interval: scheduleState.interval || 'weekly',
    selectedDay: scheduleState.selectedDay || 'Monday',
    selectedDate: scheduleState.selectedDate ? new Date(scheduleState.selectedDate) : new Date(),
  });

  const handleSave = () => {
    const updatedState = {
      ...localState,
      selectedDate: localState.selectedDate.toISOString(),
    };
    dispatch(setScheduleDetails(updatedState));
    saveStateToStorage(store.getState());
    onSave();
  };

  const handleCancel = () => {
    onCancel()
  }

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
        selectedInterval={localState.interval}
        onIntervalChange={(interval) => handleLocalStateChange('interval', interval)}
      />
      <WeekendSkipToggle
        skipWeekends={localState.skipWeekends}
        onToggle={(skip) => handleLocalStateChange('skipWeekends', skip)}
      />
      {(localState.interval === 'weekly' || localState.interval === 'every two weeks') && (
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
      )}
      {/* <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity> */}
    </ScrollView>
    <View style={styles.footerButton}>
    <TouchableOpacity style={styles.cancleButton} onPress={handleCancel}>
        <Text style={styles.cancleButtonText}>Cancle</Text>
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
    color:'#193893',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#193893',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  proceedButton: {
    width: '49%',
    backgroundColor: '#193893',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#193893',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  cancleButton:{
    width: '49%',
    //backgroundColor: '#193893',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 15,
    //borderRadius: 8,
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
  footerButton:{
    flexDirection: 'row',
    justifyContent:'space-between',
    //marginBottom: 20,
    paddingHorizontal: 20,
    //paddingVertical: 10
  }
});

export default ScheduleDetailsComponent;