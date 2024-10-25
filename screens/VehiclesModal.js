import React,{useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {store, saveStateToStorage} from '../store/store';
import {
  setReportTypes,
  setSelectedVehicles,
  setEmailIds,
} from '../selectors/ReportSlice';
import ReportTypeSelector from '../components/ReportTypeComponent';
import VehicleSelector from '../components/SelectVechicleComponent';
import EmailSelector from '../components/EmailSelectorComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';


const EditModal = ({onProceed, onCancel}) => {
  const dispatch = useDispatch();
  const {reportTypes, selectedVehicles, emailIds} = useSelector(
    state => state.reportSchedule,
  );

  const handleReportTypesChange = types => {
    dispatch(setReportTypes(types));
    saveStateToStorage(store.getState());
  };

  const handleVehiclesChange = vehicles => {
    dispatch(setSelectedVehicles(vehicles));
    saveStateToStorage(store.getState());
  };

  const handleEmailsChange = emails => {
    dispatch(setEmailIds(emails));
    saveStateToStorage(store.getState());
  };

  const selectVehicleCheck = reportTypes.find(v => v === 'vehiclewise');
  console.log('==========',selectVehicleCheck)

  const handleProceed = () => {
    if (reportTypes.length === 0) {
      Alert.alert('Error', 'Please select report type.');
      return;
    }
    
      if (selectedVehicles.length === 0) {
        Alert.alert('Error', 'Please select vehicle.');
        return;
      }
    

    if(!selectVehicleCheck && selectedVehicles.length >= 0 ){
      Alert.alert('Error', 'Please check Vehicle Wise if you select any vehicle.');
        return;
    }
    
    if (emailIds.length === 0) {
      Alert.alert('Error', 'Please add email address.');
      return;
    }
    onProceed();
  };

  const handleCancel = () => {
    onCancel();
  };

  const showVehicleSelector = reportTypes.some(
    type => type === 'vehiclewise' || type === 'drivingScoredcard',
  );
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {/* <Text style={styles.title}>Edit Schedule Reports</Text> */}
        <View style={{flexDirection: "row", justifyContent:"space-between"}}>
        <View style={{flexDirection: "row"}}>
          <Text style={styles.title}>Edit Schedule Reports</Text>
          <TouchableOpacity
            onPress={toggleModal}
          >
             <Ionicons name="alert-circle-outline" size={24} color="#1E2E4D" style={{ marginLeft:4}}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity >
          <Ionicons name="close-outline" size={30} color="#1E2E4D" />
        </TouchableOpacity>
      </View>
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
    color: '#193893',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10
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
  cancleButton: {
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
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //marginBottom: 20,
    paddingHorizontal: 20,
    //paddingVertical: 10
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
    color: '#193893',
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

export default EditModal;
