import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const TimeSelector = ({ selectedTime, onTimeChange }) => {
  const times = ['9:00 AM', '5:00 PM'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Time:</Text>
      <View style={styles.buttonContainer}>
        {times.map(time => (
          <TouchableOpacity
            key={time}
            style={[
              styles.button,
              selectedTime === time && styles.selectedButton,
            ]}
            onPress={() => onTimeChange(time)}
          >
            <Ionicons
              name={selectedTime === time  ? 'stop-circle-outline' : 'ellipse-outline'}
              size={24}
              color="#193893"
            />
            <Text style={[
              styles.buttonText,
              selectedTime === time && styles.selectedButtonText,
            ]}>
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    //borderWidth: 1,
    borderColor: '#193893',
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  selectedButton: {
    flexDirection: 'row',
    //backgroundColor: '#193893',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  selectedButtonText: {
    color: '#000',
  },
});

export default TimeSelector;
