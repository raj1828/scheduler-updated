import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Data from '../store/VehicleData.json'

const vehicle = Data.vehicles;
//console.log('vechicles Data', vehicle);

const VehicleSelector = ({ selectedVehicles, onSelectionChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState(vehicle);
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);

  const branches = Array.from(new Set(vehicle.map(vehicle => vehicle.branch))).sort();

  const handleSearch = (query, branch = selectedBranch) => {
    setSearchQuery(query);
    const filtered = vehicle.filter(vehicle => 
      (vehicle.vin.toLowerCase().includes(query.toLowerCase()) ||
       vehicle.registration_number.toLowerCase().includes(query.toLowerCase())) &&
      (branch === 'All' || vehicle.branch === branch)
    );
    setFilteredVehicles(filtered);
  };

  const toggleVehicleSelection = (vin) => {
    const updatedSelection = selectedVehicles.includes(vin)
      ? selectedVehicles.filter(v => v !== vin)
      : [...selectedVehicles, vin];
    onSelectionChange(updatedSelection);
  };

  const renderVehicleItem = ({ item }) => (
    <TouchableOpacity
      style={styles.vehicleItem}
      onPress={() => toggleVehicleSelection(item.vin)}
    >
      <Ionicons
        name={selectedVehicles.includes(item.vin) ? 'checkbox' : 'square-outline'}
        size={24}
        color="#193893"
      />
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleText}>Registration: {item.registration_number}</Text>
        <Text style={styles.vehicleSubText}>VIN: {item.vin}</Text>
        <Text style={styles.vehicleSubText}>Branch: {item.branch}</Text>
        <Text style={styles.vehicleSubText}>LOB: {item.lob_name}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setModalVisible(false);
    handleSearch(searchQuery, branch);  // Call handleSearch with updated branch
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Vehicles:</Text>
      
      <View style={{backgroundColor:"#E8ECF8"}}>
      <TouchableOpacity style={styles.branchSelector} onPress={() => {
        modalVisible ? setModalVisible(false) : setModalVisible(true)
      }}>
        <Text style={styles.branchText}>Branch: {selectedBranch}</Text>
        <Ionicons  name= {modalVisible ? "chevron-up-outline" : "chevron-down-outline"} style={{fontSize: 20}}/>
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Search vehicles"
        placeholderTextColor={'#333'}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}  // Call handleSearch with updated query
      />
      <FlatList
        data={filteredVehicles}
        renderItem={renderVehicleItem}
        keyExtractor={item => item.vin}
        style={styles.vehicleList}
        scrollEnabled={true}
        nestedScrollEnabled={true}
      />
      
      {/* Modal for branch selection */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* <Text style={styles.modalTitle}>Select Branch</Text> */}
            <FlatList
              data={['All', ...branches]}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleBranchSelect(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            {/* <Button title="Close" onPress={() => setModalVisible(false)} /> */}
          </View>
        </View>
      </Modal>
      </View>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    color: '#333',
  },
  branchSelector: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    //marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  branchText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  vehicleList: {
    height:300,
    flex: 1,  
    //backgroundColor:'#ddd'
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  vehicleInfo: {
    marginLeft: 10,
  },
  vehicleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:"#193893"
  },
  vehicleSubText: {
    fontSize: 14,
    color: '#000',
  },
  modalContainer: {
    position: "absolute",
    width: "100%",
    height: 300,
    //marginHorizontal: 20,
    marginRight: 20,
    marginLeft: 0,
    bottom: 114,
    flex: 1,
    justifyContent: 'center',
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: "#ccc",
    margin: 20,
    borderRadius: 10,
    //padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default VehicleSelector;
