import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const DaySelector = ({ selectedDay, onDayChange, skipWeekends }) => {


  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if(skipWeekends){
    days.splice(5, 2); // Removing Saturday and Sunday from the list if skipWeekends is true.
    //console.log('days after splice================',days)
  }
//console.log('skispp================',skipWeekends)
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Day:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day && styles.selectedDayButton,
            ]}
            onPress={() => onDayChange(day)}
          >
            <Text
              style={[
                styles.dayButtonText,
                selectedDay === day && styles.selectedDayButtonText,
              ]}
            >
              {day.slice(0, 3)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dayButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#193893',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedDayButton: {
    backgroundColor: '#193893',
  },
  dayButtonText: {
    color: '#193893',
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedDayButtonText: {
    color: '#fff',
  },
});

export default DaySelector;
