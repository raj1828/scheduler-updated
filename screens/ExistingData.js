import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,FlatList } from 'react-native';
import { useSelector } from 'react-redux';
 
const ExistingScheduleView = ({ onEdit, onDelete }) => {
  const scheduleState = useSelector(state => state.reportSchedule);
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Existing Schedule</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Report Types: {scheduleState.reportTypes.join(', ')}</Text>
        <Text style={styles.detailText}>Time: {scheduleState.selectedTime}</Text>
        <Text style={styles.detailText}>Interval: {scheduleState.interval}</Text>
        {(scheduleState.interval === 'weekly' || scheduleState.interval === 'every two weeks') && (
          <Text style={styles.detailText}>Day: {scheduleState.selectedDay}</Text>
        )}
        {(scheduleState.interval === 'monthly' || scheduleState.interval === 'quarterly') && (
          <Text style={styles.detailText}>Date: {new Date(scheduleState.selectedDate).toLocaleDateString()}</Text>
        )}
        <Text style={styles.detailText}>Skip Weekends: {scheduleState.skipWeekends ? 'Yes' : 'No'}</Text>
        <Text style={styles.detailText}>Selected vehicles:</Text>
      <FlatList
        data={scheduleState.selectedVehicles} // Array of vehicles
        keyExtractor={(item, index) => index.toString()} // Assuming unique indices, otherwise adjust
        renderItem={({ item }) => (
          <Text style={styles.vehicleText}>{item}</Text> // Adjust if items are objects
        )}
      />
 
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>      
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  vehicleText: {
    fontSize: 14,
    marginVertical: 4,
    color:'#333',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
 
export default ExistingScheduleView;