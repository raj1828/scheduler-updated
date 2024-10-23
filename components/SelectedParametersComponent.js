import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';


const SelectedParametersDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { reportTypes, selectedVehicles, emailIds } = useSelector(state => state.reportSchedule);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleDropdown}>
        <Text style={styles.headerText}>View Selected Parameters</Text>
        <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={24} color="#193893" />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Report Types:</Text>
          {reportTypes.map(type => (
            <View style={{flexDirection: 'row', width: "100%"}}>
              <View style={{flexDirection: 'row', alignItems:'center', width: "50%"}}>
                <Ionicons 
                  name="checkmark-circle-outline" size={20} color='green'
                />
                <Text key={type} style={styles.reportTypes}>{type}</Text>
              </View>
            </View>
          ))}
          <Text style={styles.sectionTitle}>Vehicles:</Text>
          {selectedVehicles.map(vehicle => (
            <View style={{flexDirection: 'row'}}>

              <Text key={vehicle} style={styles.item}>{vehicle}</Text>
            </View>
          ))}
          <Text style={styles.sectionTitle}>Email IDs:</Text>
          {emailIds.map(email => (
            <Text key={email} style={styles.item}>{email}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    //borderWidth: 1,
    //borderColor: '#ddd',
    borderRadius: 8,
  },
  header: {
    //borderWidth: 1,
    borderBottomWidth: 1  ,
    borderBottomColor: '#ddd',
    borderTopWidth: 1  ,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#193893',
  },
  content: {
    padding: 15,
  },
  reportTypes:{
    marginLeft: 5,
    fontSize: 16,
    marginBottom: 3,
    color:'#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color:'#333',
  },
  item: {
    fontSize: 14,
    marginBottom: 3,
    color:'#333',
  },
});

export default SelectedParametersDropdown;
