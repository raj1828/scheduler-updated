import { StyleSheet } from "react-native";


const AuthStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f7f7f7',
      },
      activityIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        zIndex: 1,
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 30,
        textAlign: 'center',
      },
      input: {
        width: '100%',
        height: 50,
        borderColor: '#bdc3c7',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#ecf0f1',
        fontSize: 16,
      },
      button: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
 },
 buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
 },
      switchText: {
        color: '#3498db',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
      },
      infoText: {
        marginTop: 20,
        color: '#3498db',
        fontSize: 14,
        textAlign: 'center',
      },
})

export default AuthStyle;
