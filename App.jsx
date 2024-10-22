import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux';
import { store, loadStateFromStorage } from './store/store';
import { setScheduleDetails } from './selectors/ReportSlice';
import ScheduleModal from './screens/ScheduleModal';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Register from './screens/Register';
import HeaderRightButton from './screens/SchedularButton';

const Stack = createStackNavigator();

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadState = async () => {
      const savedState = await loadStateFromStorage();
      if (savedState && savedState.reportSchedule) {
        dispatch(setScheduleDetails(savedState.reportSchedule));
      }
    };
    loadState();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Register" options={{headerShown: false}} component={Register} />
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard}
          options={{headerShown:false}} 
          // options={({ navigation }) => ({
          //   headerRight: () => (
          //     <HeaderRightButton navigation={navigation} />
          //   ),
          // })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;