import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const ExistingScheduleView = ({ onEdit, data }) => {
 const data2 = useSelector(state => state.reportSchedule) || {}; 

 console.log('Data ata Schedule : ', data2);
 console.log('================================', data2.selectedVehicles)
 console.log('Data ata Existing : ', data);

  console.log('emaillllllllll', data)
  console.log('emaillllllllll', data.emailIds)

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Schedule Reports</Text>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.detailsContainer}>
        <View style={styles.emailContainer}>
          {/* Email(s) Section */}
          {data2.emailIds?.length > 0 ? (
            data2.emailIds.map((email, index) => (
              <Text key={index} style={styles.emailText}>{email}</Text>
            ))
          ) : (
            <Text style={styles.emailText}>No emails available</Text>
          )}
        </View>

        {/* Report Information */}
        <Text style={styles.scheduleText}>
          You have scheduled the <Text style={styles.boldText}>{data2.interval || 'N/A'} report</Text> on{' '}
          <Text style={styles.boldText}>{data2.selectedDay || 'N/A'}, Dated {new Date(data.selectedDate).toLocaleDateString()}</Text>, at{' '}
          <Text style={styles.boldText}>{data2.selectedTime || 'N/A'}</Text>
        </Text>

        {/* Selected Reports Section */}
        <Text style={styles.sectionHeading}>Selected Reports</Text>
        {data2.reportTypes?.length > 0 ? (
          data2.reportTypes.map((report, index) => (
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
          data={data2.selectedVehicles || []}
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
