import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList, Modal } from 'react-native';

const vehicleData = [
  {
    branch: 'Thane',
    vin: 'PYV096001N5A01064',
    registration_number: 'KM10HT4629',
    lob_name: 'HCV Cargo'
  },
  {
    branch: 'Thane',
    vin: 'PYV096001N5A01068',
    registration_number: 'KM10HT4630',
    lob_name: 'HCV Cargo'
  },
  {
    branch: 'Mumbai',
    vin: 'PYV096001N5A01070',
    registration_number: 'MH12TY7896',
    lob_name: 'LCV Cargo'
  }
];

const branches = ['ALL', 'Thane', 'Mumbai'];

const ScheduleReportModal = ({ onClose }) => {
  const [reportTypes, setReportTypes] = useState({
    report1: false,
    report2: false,
    report3: false,
    report4: false,
  });
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [emailIds, setEmailIds] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const maxEmails = 5;

  const handleCheckboxChange = (reportName) => {
    setReportTypes((prev) => ({ ...prev, [reportName]: !prev[reportName] }));
  };

  const handleAddEmail = () => {
    if (emailIds.length >= maxEmails) {
      alert('Only 5 email IDs are allowed.');
      return;
    }
    if (emailInput && !emailIds.includes(emailInput)) {
      setEmailIds([...emailIds, emailInput]);
      setEmailInput('');
    }
  };

  const filterVehicles = () => {
    return vehicleData.filter(vehicle => {
      const matchesBranch = selectedBranch === 'ALL' || vehicle.branch === selectedBranch;
      const matchesSearch = vehicle.vin.includes(searchQuery) || vehicle.registration_number.includes(searchQuery);
      return matchesBranch && matchesSearch;
    });
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setShowBranchDropdown(false);
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edit Schedule Reports</Text>
        <TouchableOpacity onPress={() => alert('Only 5 email IDs are allowed')}>
          <Text style={styles.infoIcon}>i</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.label}>Select Report Types:</Text>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => handleCheckboxChange('report1')}>
              <Text style={styles.checkbox}>{reportTypes.report1 ? '☑' : '☐'} Report 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCheckboxChange('report2')}>
              <Text style={styles.checkbox}>{reportTypes.report2 ? '☑' : '☐'} Report 2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCheckboxChange('report3')}>
              <Text style={styles.checkbox}>{reportTypes.report3 ? '☑' : '☐'} Report 3</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCheckboxChange('report4')}>
              <Text style={styles.checkbox}>{reportTypes.report4 ? '☑' : '☐'} Report 4</Text>
            </TouchableOpacity>
          </View>

          {reportTypes.report2 && (
            <View style={styles.vehicleSection}>
              <Text style={styles.sectionHeader}>Select Vehicles</Text>

              {/* Branch Selection Dropdown */}
              <Text style={styles.label}>Select Branch:</Text>
              <TouchableOpacity
                style={styles.dropdownToggle}
                onPress={() => setShowBranchDropdown(!showBranchDropdown)}
              >
                <Text style={styles.dropdownText}>{selectedBranch}</Text>
              </TouchableOpacity>

              {showBranchDropdown && (
                <View style={styles.dropdownContainer}>
                  <FlatList
                    data={branches}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => handleBranchSelect(item)}
                      >
                        <Text>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}

              {/* Search Field */}
              <Text style={styles.label}>Search VIN or Registration Number:</Text>
              <TextInput
                style={styles.input}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />

              {/* Display Filtered Vehicle List */}
              <FlatList
                data={filterVehicles()}
                keyExtractor={(item) => item.vin}
                renderItem={({ item }) => (
                  <View style={styles.vehicleItem}>
                    <Text>VIN: {item.vin}</Text>
                    <Text>Registration: {item.registration_number}</Text>
                    <Text>Branch: {item.branch}</Text>
                    <Text>LOB: {item.lob_name}</Text>
                  </View>
                )}
              />
            </View>
          )}

          <Text style={styles.label}>Add Email IDs:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={emailInput}
            onChangeText={setEmailInput}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddEmail}>
            <Text style={styles.addButtonText}>Add Email</Text>
          </TouchableOpacity>

          {emailIds.length > 0 && (
            <View style={styles.emailList}>
              {emailIds.map((email, index) => (
                <Text key={index} style={styles.emailItem}>{email}</Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '75%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  checkbox: {
    fontSize: 16,
    marginBottom: 10,
  },
  vehicleSection: {
    marginVertical: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdownToggle: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  vehicleItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
 
})
export default ScheduleReportModal;