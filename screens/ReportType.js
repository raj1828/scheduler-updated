import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const reportTypes = ['fleetwise', 'vehiclewise', 'tripwise', 'drivingScoredcard'];

const ReportTypeSelector = ({ selectedTypes, onSelectionChange }) => {
  const toggleReportType = (type) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    onSelectionChange(updatedTypes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Report Types:</Text>
      {reportTypes.map(type => (
        <TouchableOpacity
          key={type}
          style={styles.checkboxContainer}
          onPress={() => toggleReportType(type)}
        >
          <Ionicons
            name={selectedTypes.includes(type) ? 'checkbox' : 'square-outline'}
            size={24}
            color="#193893"
          />
          <Text style={styles.checkboxLabel}>{type}</Text>
        </TouchableOpacity>
      ))}
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
    color:'#193893',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color:'#000',

  },
});

export default ReportTypeSelector;
