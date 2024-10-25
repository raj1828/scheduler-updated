import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ExistingScheduleView = ({ onEdit, data , onClose}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
 const data2 = useSelector(state => state.reportSchedule) || {}; 

 console.log('Data ata Schedule : ', data2);
 console.log('================================', data2.selectedVehicles)
 console.log('Data ata Existing : ', data);

  console.log('emaillllllllll', data)
  console.log('emaillllllllll', data.emailIds)

  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row", justifyContent:"space-between"}}>
        <View style={{flexDirection: "row"}}>
          <Text style={styles.heading}>Schedule Reports</Text>
          <TouchableOpacity
            onPress={toggleModal}
          >
             <Ionicons name="alert-circle-outline" size={24} color="#1E2E4D" style={{ marginLeft:4}}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close-outline" size={30} color="#1E2E4D" />
        </TouchableOpacity>
      </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={{marginBottom: 7}}>Your selected reports will be sent to</Text>
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
              <Ionicons name="checkmark-circle" size={23} color="#4CAF50"/>
              <Text style={styles.reportText}>{report}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.reportText}>No reports selected</Text>
        )}

        {/* Selected Vehicles Section */}
        <Text style={styles.sectionHeading}>Selected Vehicles</Text>
        <FlatList
        style={{backgroundColor:"#F0F1F6", padding:10}}
          data={data2.selectedVehicles || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.vehicleItem}>
              <Text style={styles.vehicleText}>{item|| 'N/A'}</Text>
              {/* <Text style={styles.vehicleSubText}>{item.details || 'No details available'}</Text> */}
            </View>
          )}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          ListEmptyComponent={<Text style={styles.vehicleText}>No vehicles selected</Text>}
        />
      </View>

      </ScrollView>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <Ionicons name="pencil-outline" color="#fff" size={20}/>
        <Text style={styles.buttonText}>Edit Schedule</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType='none'
        visible={isModalVisible} 
        //onBackdropPress={toggleModal}
        style={{backgroundColor:'red'}}
        onRequestClose={toggleModal} 
      >
        <View style={{backgroundColor: "#fff", width:"90%", height:"20%", position:'absolute', top: 270, left: 20}}>
            
        <TouchableOpacity
    style={styles.modalOverlay}
    activeOpacity={1}
    onPress={toggleModal} // Close modal when clicking outside of it
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {/* Close Icon */}
        <View style={{flexDirection:'row', justifyContent:'space-between', width: "100%", alignItems:'center'}}>

          <Text style={styles.title}>Disclaimer:</Text>

          <TouchableOpacity onPress={toggleModal}>
            <Ionicons name="close-outline" size={30} color="#1E2E4D" />
          </TouchableOpacity>
        </View>
        <View style={styles.bulletPointContainer}>
          <Text style={styles.bulletText}>
            1. Only 5 vehicles can be selected for Vehicle Wise Report.
          </Text>
          <Text style={styles.bulletText}>
            2. Only 9am or 5pm schedule time can be selected for the Reports.
          </Text>
          <Text style={styles.bulletText}>
            3. Scheduling of the reports will be uniform for all users. This functionality doesn’t support user level customization for scheduling reports.
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
      
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    //margin: 20,
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
    fontWeight: 'bold'
  },
  scheduleText: {
    fontSize: 18,
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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
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
    flexDirection: 'row',
    justifyContent:'center',
    backgroundColor: '#1E2E4D',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'flex-start', // Aligns title and text to the start (left)
    width: '90%',
    // Add shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'left',
  },
  
  
});

export default ExistingScheduleView;
