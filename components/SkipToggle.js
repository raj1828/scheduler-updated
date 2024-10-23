import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const WeekendSkipToggle = ({ skipWeekends, onToggle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Skip Weekends:</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#193893" }}
        thumbColor={skipWeekends ? "#fff" : "#f4f3f4"}
        // ios_backgroundColor="#3e3e3e"
        onValueChange={onToggle}
        value={skipWeekends}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#333',
  },
});

export default WeekendSkipToggle;
