import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { login } from '../selectors/ReportSlice'; 
import AuthStyle from './Styles/AuthStyle';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  

  useEffect(() => {
    const checkLoginStatus = async () => {
      setLoading(true);
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const storedUser = await AsyncStorage.getItem('user');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (isLoggedIn === 'true' && parsedUser) {
          dispatch(login(parsedUser)); // Dispatch the login action with user data
          navigation.navigate('Dashboard');
        }
      } catch (error) {
        console.error('Failed to check login status', error);
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, [dispatch, navigation]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!email || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      const storedUser = await AsyncStorage.getItem('user');
      console.log('======', storedUser)
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      if (parsedUser && parsedUser.email === email && parsedUser.password === password) {
        dispatch(login({ email, password })); // Dispatch the login action with user credentials
        await AsyncStorage.setItem('isLoggedIn', 'true');
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate('Dashboard');
        setEmail("");
        setPassword("");
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={AuthStyle.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={AuthStyle.activityIndicator} />
      ) : (
        <>
          <Text style={AuthStyle.title}>Login</Text>

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

          <TouchableOpacity style={AuthStyle.button} onPress={handleLogin}>
            <Text style={AuthStyle.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={AuthStyle.switchText}>Don't have an account? Register</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default Login;
