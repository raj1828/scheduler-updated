import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const DaySelector = ({ selectedDay, onDayChange, skipWeekends }) => {


  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if(skipWeekends){
    days.splice(5, 2); // Removing Saturday and Sunday from the list if skipWeekends is true.
    //console.log('days after splice================',days)
  }
//console.log('skispp================',skipWeekends)
  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Select Day:</Text> */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day && styles.selectedDayButton,
            ]}
            onPress={() => onDayChange(day)}
          >
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>

              <Text
                style={[
                  styles.dayButtonText,
                  selectedDay === day && styles.selectedDayButtonText,
                ]}
              >
                {day}
              </Text>
                <Ionicons
                // name="ellipse-outline" 
                name={selectedDay === day ? 'stop-circle-outline' : 'ellipse-outline'}
                size={24} color="#193893" />
              
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    marginBottom: 20,
    marginTop:10,
    backgroundColor: '#DDEFF8',
    padding: 10
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dayButton: {
    width:140,
    paddingHorizontal: 10,
    //paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
    //alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#fff'
  },
  selectedDayButton: {
    borderWidth:1,
    borderColor: '#193893',
  },
  dayButtonText: {
    color: '#193893',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDayButtonText: {
    color: '#193893',
  },
});

export default DaySelector;
