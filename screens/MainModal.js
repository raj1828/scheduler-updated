import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import EditModal from './VehiclesModal';
import ScheduleDetailsComponent from './DetailSchedual';
import FinalConfirmationModal from './ConfirmPage';
import ExistingScheduleView from './ExistingData';
import { setModalStep } from '../selectors/ReportSlice';
import { loadStateFromStorage } from '../store/store';
const ScheduleModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const currentStep = useSelector(state => state.reportSchedule.currentModalStep);
 const [existData, setExitData] = useState(null);
 const {user, isLoggedIn} = useSelector(state => state.reportSchedule)

  const scheduleData = useSelector(state => state.reportSchedule)
  console.log('schedule data on dashboard:', scheduleData)

  const handleClose = () => {
    dispatch(setModalStep('edit')); // Reset to 'edit' step
    onClose();
  };

  useEffect(() => {
    const previousState = async () => {
      if (visible) {
        const loadedState = await loadStateFromStorage();
        console.log('persissata',loadedState)
        if (loadedState && loadedState.reportSchedule) {
          console.log('inside')
          const userSchedule = loadedState.reportSchedule.fullData.find(
            schedule => schedule.id?.email === user.email
          );
          console.log(...loadedState.reportSchedule.fullData)
          console.log(userSchedule)
          setExitData(userSchedule || null);
        }
        console.log('curreentSTep', currentStep)
        dispatch(setModalStep('view'))
        //currentStep('view');
      }
    };
   
    previousState();
  }, [visible]);

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <Text style={styles.errorText}>
          Please log in to view or create a schedule.
        </Text>
      );
    }

    //const canEditSchedule = scheduleExists && loggedInUserEmail === scheduleUserEmail;
    
    console.log('state of modal', currentStep)
    switch (currentStep) {
      case 'view':
        if (existData) {
          return (
            <ExistingScheduleView
              data= {existData}
              onEdit={() => dispatch(setModalStep('edit'))} // Change to 'edit' step
            />
          );
        } else {
          return (
            // <View style={styles.noScheduleContainer}>
            //   <Text style={styles.noScheduleText}>
            //     No schedule exists. Create a new one?
            //   </Text>
            //   <TouchableOpacity
            //     style={styles.createButton}
            //     onPress={() => dispatch(setModalStep('edit'))} // Change to 'edit' step
            //   >
            //     <Text style={styles.buttonText}>Create Schedule</Text>
            //   </TouchableOpacity>
            // </View>
            <EditModal
            onCancel={handleClose}
            onProceed={() => dispatch(setModalStep('details'))} // Change to 'details' step
          />
          );
        }
      case 'edit':
        return (
          <EditModal
            onCancel={handleClose}
            onProceed={() => dispatch(setModalStep('details'))} // Change to 'details' step
          />
        );
      case 'details':
        return (
          <ScheduleDetailsComponent
            onCancel={handleClose}
            onSave={() => dispatch(setModalStep('confirmation'))} // Change to 'confirmation' step
          />
        );
      case 'confirmation':
        return <FinalConfirmationModal onCancel={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {renderContent()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 34,
    height: '75%',
  },
  errorText: {
    fontSize: 18,
    color: '#F44336',
    textAlign: 'center',
    marginTop: 20,
  },
  noScheduleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noScheduleText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScheduleModal;
