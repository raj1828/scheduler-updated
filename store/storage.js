import AsyncStorage from "@react-native-async-storage/async-storage";

// Save data to AsyncStorage
export const saveUserToLocalStorage = async (userData) => {
    try {
        const existingUser = await getUserFromLocalStorage();
        const updateUsers =Array.isArray(existingUser) ? [...existingUser, userData] : [userData];
        await AsyncStorage.setItem('userInfo', JSON.stringify(updateUsers));
    } catch (error) {
        console.log('Error in save user to local storage', error);
    }
}

// Get data from AsyncStorage
export const getUserFromLocalStorage = async () => {
    try {
        const userData = await AsyncStorage.getItem('userInfo');
        return userData ? JSON.parse(userData) : [];
    } catch (error) {
        console.log('Error in get user from local storage', error);
        return [];
    }
};

