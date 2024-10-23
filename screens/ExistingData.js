import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const ExistingScheduleView = ({ onEdit }) => {
  const scheduleState = useSelector(state => state.reportSchedule) || {}; 

  console.log('emaillllllllll', scheduleState)
  console.log('emaillllllllll', scheduleState.emailIds)

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Schedule Reports</Text>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.detailsContainer}>
        <View style={styles.emailContainer}>
          {/* Email(s) Section */}
          {scheduleState.emailIds?.length > 0 ? (
            scheduleState.emailIds.map((email, index) => (
              <Text key={index} style={styles.emailText}>{email}</Text>
            ))
          ) : (
            <Text style={styles.emailText}>No emails available</Text>
          )}
        </View>

        {/* Report Information */}
        <Text style={styles.scheduleText}>
          You have scheduled the <Text style={styles.boldText}>{scheduleState.interval || 'N/A'} report</Text> on{' '}
          <Text style={styles.boldText}>{scheduleState.selectedDay || 'N/A'}, Dated {new Date(scheduleState.selectedDate).toLocaleDateString()}</Text>, at{' '}
          <Text style={styles.boldText}>{scheduleState.selectedTime || 'N/A'}</Text>
        </Text>

        {/* Selected Reports Section */}
        <Text style={styles.sectionHeading}>Selected Reports</Text>
        {scheduleState.reportTypes?.length > 0 ? (
          scheduleState.reportTypes.map((report, index) => (
            <View key={index} style={styles.reportItem}>
              <Text style={styles.reportText}>✔ {report}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.reportText}>No reports selected</Text>
        )}

        {/* Selected Vehicles Section */}
        <Text style={styles.sectionHeading}>Selected Vehicles</Text>
        <FlatList
          data={scheduleState.selectedVehicles || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.vehicleItem}>
              <Text style={styles.vehicleText}>{item|| 'N/A'}</Text>
              {/* <Text style={styles.vehicleSubText}>{item.details || 'No details available'}</Text> */}
            </View>
          )}
          ListEmptyComponent={<Text style={styles.vehicleText}>No vehicles selected</Text>}
        />
      </View>

      </ScrollView>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <Text style={styles.buttonText}>Edit Schedule</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E2E4D',
  },
  emailContainer: {
    backgroundColor: '#F0F1F6',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  emailText: {
    fontSize: 16,
    color: '#5A5A5A',
    marginBottom: 5,
  },
  scheduleText: {
    fontSize: 16,
    color: '#5A5A5A',
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#1E2E4D',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#1E2E4D',
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reportText: {
    fontSize: 16,
    color: '#4CAF50',
    marginLeft: 10,
  },
  vehicleItem: {
    backgroundColor: '#F0F1F6',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  vehicleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E2E4D',
  },
  vehicleSubText: {
    fontSize: 14,
    color: '#5A5A5A',
  },
  editButton: {
    backgroundColor: '#1E2E4D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ExistingScheduleView;
