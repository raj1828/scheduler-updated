import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EmailSelector = ({ emailIds, onEmailsChange }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const checkMail = (email) => {
    // Simple email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addEmail = () => {
    if (emailIds.length >= 5) {
      setError('Email Address Limit Reaches.');
      return;
    }

    if (email && !emailIds.includes(email)) {
      if (checkMail(email)) {
        onEmailsChange([...emailIds, email]);
        setEmail('');
        setError(''); // Clear error if the email is valid
      } else {
        setError('Please enter a valid email address.');
      }
    } else if (emailIds.includes(email)) {
      setError('This email is Exist');
    }
  };

  const removeEmail = (emailToRemove) => {
    onEmailsChange(emailIds.filter(e => e !== emailToRemove));
    setError(''); // Clear error if the user removes an email
  };

  const renderEmailItem = ({ item }) => (
    <View style={styles.emailItem}>
      <Text style={styles.emailText}>{item}</Text>
      <TouchableOpacity onPress={() => removeEmail(item)}>
        <Ionicons name="trash-outline" size={24} color="#193893" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Email IDs:</Text>
      <View style={styles.inputContainer}>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <FlatList
        data={emailIds}
        renderItem={renderEmailItem}
        keyExtractor={item => item}
        style={styles.emailList}
      />
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          placeholderTextColor={'#333'}
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            if (error) setError(''); // Clear error on new input
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.addButton} onPress={addEmail}>
          <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems: 'center', }}>
            <Text style={{color: 'blue', fontWeight: 700, fontSize: 16}}>Add More</Text>
            <Ionicons name="add-circle-outline" size={24}  color="blue" />
          </View>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  inputContainer: {
    
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    width:"100%",
    //backgroundColor: '#193893',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,

  },
  emailList: {
    maxHeight: 150,
  },
  emailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E8ECF8',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});

export default EmailSelector;
