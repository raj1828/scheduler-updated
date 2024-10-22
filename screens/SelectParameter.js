import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ScheduleDetailsComponent = ({ selectedData, onSave }) => {
  const [selectedTime, setSelectedTime] = useState('9:00 AM');
  const [skipWeekends, setSkipWeekends] = useState(false);
  const [interval, setInterval] = useState('weekly');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const renderSelectedParameters = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selected Parameters</Text>
        <Picker
          selectedValue="default"
          style={styles.picker}
          onValueChange={(itemValue) => console.log(itemValue)}
        >
          <Picker.Item label="View Selected Parameters" value="default" />
          <Picker.Item label={`Report Types: ${selectedData.reportTypes.join(', ')}`} value="reportTypes" />
          <Picker.Item label={`Vehicles: ${selectedData.selectedVehicles.join(', ')}`} value="vehicles" />
          <Picker.Item label={`Emails: ${selectedData.emailIds.join(', ')}`} value="emails" />
        </Picker>
      </View>
    );
  };

  const renderTimeSelection = () => {
    return (
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Set Time:</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[styles.radioButton, selectedTime === '9:00 AM' && styles.radioButtonSelected]}
            onPress={() => setSelectedTime('9:00 AM')}
          >
            <Text style={styles.radioButtonText}>9:00 AM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, selectedTime === '5:00 PM' && styles.radioButtonSelected]}
            onPress={() => setSelectedTime('5:00 PM')}
          >
            <Text style={styles.radioButtonText}>5:00 PM</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderWeekendSkip = () => {
    return (
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Skip Weekends:</Text>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setSkipWeekends(!skipWeekends)}
        >
          {skipWeekends && <Ionicons name="checkmark" size={24} color="#FF5722" />}
        </TouchableOpacity>
      </View>
    );
  };

  const renderIntervalSelection = () => {
    return (
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Set Interval:</Text>
        <View style={styles.radioGroup}>
          {['weekly', 'every two weeks', 'monthly', 'quarterly'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.radioButton, interval === option && styles.radioButtonSelected]}
              onPress={() => setInterval(option)}
            >
              <Text style={styles.radioButtonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderDaySelection = () => {
    if (interval === 'weekly' || interval === 'every two weeks') {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daySelector}>
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              style={[styles.dayButton, selectedDay === day && styles.dayButtonSelected]}
              onPress={() => setSelectedDay(day)}
            >
              <Text style={styles.dayButtonText}>{day.slice(0, 3)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    }
    return null;
  };

  const renderDatePicker = () => {
    if (interval === 'monthly' || interval === 'quarterly') {
      return (
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Select Date:</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{selectedDate.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) setSelectedDate(date);
              }}
              minimumDate={new Date()}
            />
          )}
        </View>
      );
    }
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      {renderSelectedParameters()}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schedule Settings</Text>
        <TouchableOpacity  onPress={renderTimeSelection()}>
        <Ionicons name="chevron-down" size={24} color="#FF5722" />
        
        </TouchableOpacity>
        {renderWeekendSkip()}
        {renderIntervalSelection()}
        {renderDaySelection()}
        {renderDatePicker()}
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => onSave({
          selectedTime,
          skipWeekends,
          interval,
          selectedDay,
          selectedDate
        })}
      >
        <Text style={styles.saveButtonText}>Save Schedule</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF5722',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#FF5722',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#FF5722',
  },
  radioButtonText: {
    color: '#FF5722',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#FF5722',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daySelector: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  dayButton: {
    borderWidth: 1,
    borderColor: '#FF5722',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  dayButtonSelected: {
    backgroundColor: '#FF5722',
  },
  dayButtonText: {
    color: '#FF5722',
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
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
});

export default ScheduleDetailsComponent;