import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {  saveStateToStorage, store } from '../store/store';
import {  scheduleDetails, setFullData, setModalStep } from '../selectors/ReportSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';



const FinalConfirmationModal = ({ onCancel }) => {
  const dispatch = useDispatch();
  const scheduleState = useSelector((state) => state.reportSchedule);
  console.log("schedule state: ", scheduleState);
  const userEmail = scheduleState.user;

  console.log('day ----', scheduleState.selectedDay)
// const change= 
//   scheduleState.currentModalStep('view')
// }
  const onSave = () => {
    const update1 = {
      ...scheduleState,
    }
    dispatch(scheduleDetails(update1));
    const data = {
      id : userEmail,
      ...scheduleState
    }
    //dispatch(setModalStep('view'))
    dispatch(setFullData(data))
    saveStateToStorage(store.getState());
    //console.log('a',store.getState());
    onCancel();
  };

  return (
    <>
    <ScrollView style={styles.container}>
      <View style={{justifyContent:'center', width:'100%', alignItems:'center'}}>
        <Ionicons
          name='checkmark-done-circle-outline' 
          size={50}
          color="green"
        />
        <Text style={styles.title}>Report Scheduled Successfully!</Text>
      </View>
      <View style={styles.detailsContainer}>

        <Text style={{fontSize:18, width: '100%', alignItems:'center', justifyContent:'center'}}>
          You have schedule the <Text style={{fontWeight: 700}}>{scheduleState.selectedDay.charAt(0).toUpperCase()+ scheduleState.selectedDay.slice(1)} Report</Text>  on <Text style={{fontWeight: 700}}>{scheduleState.selectedDay}</Text>, on Dated <Text style={{fontWeight: 700}}>{new Date(scheduleState.selectedDate).toLocaleDateString()}</Text>, at <Text style={{fontWeight: 700}}>{scheduleState.selectedTime}</Text> 
        </Text>

        <Text style={styles.detailTitle}>Selected Report :</Text>
        {
          scheduleState.reportTypes.map((type, index) => (
            <View  key={index} style={{flexDirection: 'row',alignItems:'center', justifyContent:'start', marginBottom:10}}>
              <Ionicons 
                name='checkmark-circle'
                size={24}
                color='green'
              />
              <Text style={styles.detailText}>{type.charAt(0).toUpperCase()+ type.slice(1)}</Text>
            </View>
          ))
        }
        

        {/* <Text style={styles.detailTitle}>Scheduled Time:</Text>
        <Text style={styles.detailText}>{scheduleState.selectedTime}</Text>

        <Text style={styles.detailTitle}>Interval:</Text>
        <Text style={styles.detailText}>{scheduleState.interval}</Text>

        {(scheduleState.interval === 'weekly' || scheduleState.interval === 'every two weeks') && (
          <>
            <Text style={styles.detailTitle}>Day:</Text>
            <Text style={styles.detailText}>{scheduleState.selectedDay}</Text>
          </>
        )}

        {(scheduleState.interval === 'monthly' || scheduleState.interval === 'quarterly') && (
          <>
            <Text style={styles.detailTitle}>Date:</Text>
            <Text style={styles.detailText}>{new Date(scheduleState.selectedDate).toLocaleDateString()}</Text>
          </>
        )} */}

        {/* <Text style={styles.detailTitle}>Skip Weekends:</Text>
        <Text style={styles.detailText}>{scheduleState.skipWeekends ? 'Yes' : 'No'}</Text> */}
      </View>
      
      
    </ScrollView>
    <TouchableOpacity style={styles.okayButton} onPress={onSave}>
        <Text style={styles.okayButtonText}>Okay</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginTop:20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'#193893',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom:20,
    color:'#333',
  },
  detailText: {
    marginLeft: 8,
    fontSize: 18,
    marginBottom: 5,
    color:'#333',
  },
  okayButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  okayButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FinalConfirmationModal;