import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IntervalSelector = ({ selectedInterval, onIntervalChange }) => {
  const intervals = ['weekly', 'every two weeks', 'monthly', 'quarterly'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Interval:</Text>
      <View style={styles.buttonContainer}>
        {intervals.map(interval => (
          <TouchableOpacity
            key={interval}
            style={[
              styles.button,
              selectedInterval === interval && styles.selectedButton,
            ]}
            onPress={() => onIntervalChange(interval)}
          >
            <Ionicons
              name={selectedInterval === interval  ? 'stop-circle-outline' : 'ellipse-outline'}
              size={24}
              color="#193893"
            />
            <Text style={[
              styles.buttonText,
              selectedInterval === interval && styles.selectedButtonText,
            ]}>
              {interval}
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
    flexDirection: 'column',
  },
  button: {
    flexDirection: 'row',
    padding: 10,
    //borderWidth: 1,
    //borderColor: '#193893',
    borderRadius: 8,
    marginBottom: 1,
    alignItems: 'center',
  },
  selectedButton: {
    //backgroundColor: '#193893',
  },
  buttonText: {
    color: '#193893',
    fontSize: 16,
  },
  selectedButtonText: {
    color: '#193893',
  },
});

export default IntervalSelector;
