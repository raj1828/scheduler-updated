import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Modal, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import EditModal from './Editmodal';
import ScheduleDetailsComponent from './ScheduleDetails';
import FinalConfirmationModal from './FinalConfirmation';
import ExistingScheduleView from './ExistingData';

const ScheduleModal = ({visible, onClose}) => {
  const [currentStep, setCurrentStep] = useState('edit');
  const scheduleExists = useSelector(
    state => state.reportSchedule.reportTypes.length > 0,
  );

  const isLoggedIn = useSelector(state => state.reportSchedule.isLoggedIn);
  const loggedInUserEmail = useSelector(
    state => state.reportSchedule.user?.email,
  );
  const scheduleUserEmail = useSelector(
    state => state.reportSchedule.userEmail,
  );

  useEffect(() => {
    if (visible) {
      setCurrentStep('view');
    }
  }, [visible]);

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <Text style={styles.errorText}>
          Please log in to view or create a schedule.
        </Text>
      );
    }

    const canEditSchedule =
      scheduleExists && loggedInUserEmail === scheduleUserEmail;

      console.log('scheduleExists:', scheduleExists);
  console.log('loggedInUserEmail:', loggedInUserEmail);
  console.log('scheduleUserEmail:', scheduleUserEmail);
  console.log('Can Edit Schedule:', canEditSchedule);

    switch (currentStep) {
      case 'view':
        if (scheduleExists) {
          return (
            <ExistingScheduleView
              onEdit={canEditSchedule ? () => setCurrentStep('edit') : null}
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
                onPress={() => setCurrentStep('edit')}>
                <Text style={styles.buttonText}>Create Schedule</Text>
              </TouchableOpacity>
            </View>
          );
        }
      case 'edit':
        return <EditModal onProceed={() => setCurrentStep('details')} />;
      case 'details':
        return (
          <ScheduleDetailsComponent
            onSave={() => setCurrentStep('confirmation')}
          />
        );
      case 'confirmation':
        return <FinalConfirmationModal onCancel={handleClose} />;
      default:
        return null;
    }
  };

  const handleClose = () => {
    setCurrentStep('edit');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {renderContent()}
          {/* {currentStep !== 'confirmation' && (
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeButtonText}>Can</Text>
            </TouchableOpacity>
          )} */}
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
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
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
  }
});

export default ScheduleModal;
