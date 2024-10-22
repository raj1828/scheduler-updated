import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import EditModal from './Editmodal';
import ScheduleDetailsComponent from './ScheduleDetails';
import FinalConfirmationModal from './FinalConfirmation';

const ScheduleModal = ({ visible, onClose }) => {
  const [currentStep, setCurrentStep] = useState('edit');
  const scheduleExists = useSelector(state => state.reportSchedule.reportTypes.length > 0);

  const renderContent = () => {
    switch (currentStep) {
      case 'edit':
        return <EditModal onCancel={onClose} onProceed={() => setCurrentStep('details')} />;
      case 'details':
        return <ScheduleDetailsComponent onCancel={onClose} onSave={() => setCurrentStep('confirmation')} />;
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
      onRequestClose={handleClose}
    >
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
});

export default ScheduleModal;
