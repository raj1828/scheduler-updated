import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
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
  const [loading, setLoading] = useState(true); 
  const { user, isLoggedIn } = useSelector(state => state.reportSchedule);

  useEffect(() => {
    const previousState = async () => {
      if (visible) {
        setLoading(true); 
        const loadedState = await loadStateFromStorage();
        if (loadedState && loadedState.reportSchedule) {
          const userSchedule = loadedState.reportSchedule.fullData.find(
            schedule => schedule.id?.email === user.email
          );
          setExitData(userSchedule || null);
        }
        dispatch(setModalStep('view'));
        setLoading(false); 
      }
    };

    previousState();
  }, [visible]);

  const handleClose = () => {
    dispatch(setModalStep('edit')); // Reset to Edit step
    onClose();
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <Text style={styles.errorText}>
          Please log in to view or create a schedule.
        </Text>
      );
    }

    switch (currentStep) {
      case 'view':
        if (existData) {
          return (
            <ExistingScheduleView
              data={existData} 
              onClose={onClose}
              onEdit={() => dispatch(setModalStep('edit'))} // Change to 'edit' step
            />
          );
        } else {
          return (
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
          {loading ? ( 
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#193893" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            renderContent()
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default ScheduleModal;
