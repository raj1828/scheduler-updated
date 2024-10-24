import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { register } from '../selectors/ReportSlice';
import AuthStyle from './Styles/AuthStyle';
import { resetData } from '../selectors/ReportSlice';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const passregex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passregex.test(password);
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 8 characters long, and include at least one uppercase letter, one number, and one special character.');
      return;
    }
    try {
      const userData = { email, password };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      dispatch(register(userData));
      dispatch(resetData());
      Alert.alert('Success', 'Registered successfully!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to register');
    }
  };

  return (
    <View style={AuthStyle.container}>
      <Text style={AuthStyle.title}>Register</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#B0BEC5"
        style={AuthStyle.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#B0BEC5"
        style={AuthStyle.input}
      />
      <TouchableOpacity style={AuthStyle.button} onPress={handleRegister}>
        <Text style={AuthStyle.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={AuthStyle.switchText}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
});

export default Register;
