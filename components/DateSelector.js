import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert,ToastAndroid } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


const DateSelector = ({ selectedDate, onDateChange, skipWeekends }) => {
  const [show, setShow] = useState(false);

  const showToast = () => {
    ToastAndroid.show('Disable Skip weekend to select this date.', ToastAndroid.SHORT);
  };

console.log(skipWeekends)

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday is 0, Saturday is 6
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    
    // Check if the selected date is a weekend
    if(skipWeekends){

        if (isWeekend(currentDate)) {
          showToast();
          return;
        }
    }
    
    setShow(Platform.OS === 'ios');
    onDateChange(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Date:</Text>
      <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>
          {selectedDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date()} // Prevent selecting past dates
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#193893',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#193893',
    fontSize: 16,
  },
});

export default DateSelector;
