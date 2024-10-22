import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScheduleModal from './ScheduleModal';
import HeaderRightButton from './SchedularButton';

const Dashboard = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.showModal) {
      setModalVisible(true);
      navigation.setParams({ showModal: undefined });
    }
  }, [route.params?.showModal]);

  return (
    <View style={styles.container}>

      <HeaderRightButton navigation={navigation}/>
      
      <ScheduleModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default Dashboard;