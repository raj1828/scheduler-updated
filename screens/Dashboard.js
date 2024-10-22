import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScheduleModal from './ScheduleModal';
import HeaderRightButton from './SchedularButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Dashboard = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.showModal) {
      setModalVisible(true);
      navigation.setParams({ showModal: undefined });
    }
  }, [route.params?.showModal]);

const handelLogout = () => {
  navigation.navigate('Login');
}

  return (
    <>
    <View style={styles.containerLogout}>
      <TouchableOpacity
        onPress={handelLogout}
      >

        <Ionicons 
          name='exit-outline'
          size={50}
          color='#193893'
        />
      </TouchableOpacity>
      
      </View>
      <View style={styles.container}>


      <HeaderRightButton navigation={navigation}/>
      
      <ScheduleModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerLogout:{
    width: '100%',
    justifyContent:'end',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default Dashboard;