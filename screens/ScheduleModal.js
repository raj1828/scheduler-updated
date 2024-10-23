import React, { useEffect } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import EditModal from './Editmodal';
import ScheduleDetailsComponent from './ScheduleDetails';
import FinalConfirmationModal from './ConfirmPage';
import ExistingScheduleView from './ExistingData';
import { setModalStep } from '../selectors/ReportSlice';
const ScheduleModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const currentStep = useSelector(state => state.reportSchedule.currentModalStep);
  const scheduleExists = useSelector(state => state.reportSchedule.reportTypes.length > 0);
  const isLoggedIn = useSelector(state => state.reportSchedule.isLoggedIn);
  const loggedInUserEmail = useSelector(state => state.reportSchedule.user?.email);
  const scheduleUserEmail = useSelector(state => state.reportSchedule.userEmail);

  const scheduleData = useSelector(state => state.reportSchedule)
  console.log('schedule data on dashboard:', scheduleData)

  const handleClose = () => {
    dispatch(setModalStep('edit')); // Reset to 'edit' step
    onClose();
  };

  useEffect(() => {
    if (visible) {
      dispatch(setModalStep('view')); // Set to 'view' when modal opens
    }
  }, [visible, dispatch]);

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <Text style={styles.errorText}>
          Please log in to view or create a schedule.
        </Text>
      );
    }

    const canEditSchedule = scheduleExists && loggedInUserEmail === scheduleUserEmail;

    switch (currentStep) {
      case 'view':
        if (scheduleExists) {
          return (
            <ExistingScheduleView
              onEdit={() => dispatch(setModalStep('edit'))} // Change to 'edit' step
            />
          );
        } else {
          return (
            <View style={styles.noScheduleContainer}>
              <Text style={styles.noScheduleText}>
                No schedule exists. Create a new one?
              </Text>
              <TouchableOpacity
                style={styles.createButton}
                onPress={() => dispatch(setModalStep('edit'))} // Change to 'edit' step
              >
                <Text style={styles.buttonText}>Create Schedule</Text>
              </TouchableOpacity>
            </View>
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
