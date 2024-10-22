import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const HeaderRightButton = ({ navigation }) => {
  const handlePress = () => {
    navigation.setParams({ showModal: true });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>Schedule</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    width: 150,
    marginRight: 15,
    padding: 20,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  buttonText: {
    fontSize:18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HeaderRightButton;