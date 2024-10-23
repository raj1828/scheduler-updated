import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { store,saveStateToStorage } from '../store/store';
import { setReportTypes, setSelectedVehicles, setEmailIds } from '../selectors/ReportSlice';
import ReportTypeSelector from '../components/ReportTypeComponent';
import VehicleSelector from '../components/SelectVechicleComponent';
import EmailSelector from '../components/EmailSelectorComponent';

const EditModal = ({ onProceed, onCancel }) => {
  const dispatch = useDispatch();
  const { reportTypes, selectedVehicles, emailIds } = useSelector(state => state.reportSchedule);

  const handleReportTypesChange = (types) => {
    dispatch(setReportTypes(types));
    saveStateToStorage(store.getState());
  };

  const handleVehiclesChange = (vehicles) => {
    dispatch(setSelectedVehicles(vehicles));
    saveStateToStorage(store.getState());
  };

  const handleEmailsChange = (emails) => {
    dispatch(setEmailIds(emails));
    saveStateToStorage(store.getState());
  };

  const handleProceed = () => {
    if (reportTypes.length === 0) {
      Alert.alert('Error', 'Please select at least one report type.');
      return;
    }
    if (selectedVehicles.length === 0) {
      Alert.alert('Error', 'Please select at least one vehicle.');
      return;
    }
    if (emailIds.length === 0) {
      Alert.alert('Error', 'Please add at least one email address.');
      return;
    }
    onProceed();
  };

  const handleCancel = () => {
    onCancel()
  }

  const showVehicleSelector = reportTypes.some(type => type === 'vehiclewise' || type === 'drivingScoredcard');


  return (
    <>
        <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Schedule Reports</Text>
      <ReportTypeSelector
        selectedTypes={reportTypes}
        onSelectionChange={handleReportTypesChange}
      />
     {showVehicleSelector && (
        <VehicleSelector
          selectedVehicles={selectedVehicles}
          onSelectionChange={handleVehiclesChange}
        />
      )}
      <EmailSelector
        emailIds={emailIds}
        onEmailsChange={handleEmailsChange}
      />
    </ScrollView>
    <View style={styles.footerButton}>
    <TouchableOpacity style={styles.cancleButton} onPress={handleCancel}>
        <Text style={styles.cancleButtonText}>Cancle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
      
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#193893'
  },
  proceedButton: {
    width: '49%',
    backgroundColor: '#193893',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#193893',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  cancleButton:{
    width: '49%',
    //backgroundColor: '#193893',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 15,
    //borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
    borderWidth: 1,
  },
  proceedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cancleButtonText: {
    color: '#193893',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footerButton:{
    flexDirection: 'row',
    justifyContent:'space-between',
    //marginBottom: 20,
    paddingHorizontal: 20,
    //paddingVertical: 10
  }
});

export default EditModal;
