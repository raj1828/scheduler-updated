import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useSelector, useDispatch } from 'react-redux';
import { saveStateToStorage, store } from '../store/store';
import { setScheduleDetails } from '../selectors/ReportSlice';

import DaySelector from './DaySelector';
import DateSelector from './DateSelector';

const IntervalSelector = ({ selectedInterval, onIntervalChange }) => {
  //selectedDate: scheduleState.selectedDate ? new Date(scheduleState.selectedDate) : new Date(),
  const [selectedDate, setSelectedDate] = useState(new Date())
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
          selectedDay={selectedInterval}
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
          selectedDay={selectedInterval}
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
          selectedDate={selectedDate}
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
          selectedDate={selectedDate}
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
