import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CommonActions } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const LoginButton = ({ navigation }) => {
  const handleLoginPress = () => {
    // Reset the navigation stack and navigate to the Login screen
    navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Login' },
          ],
        })
    );
  };

  return (
      <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLoginPress}
      >
        <Text style={styles.customButtonText}>Login</Text>
      </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
      <LinearGradient
          colors={['#884fcc', '#3fcffb', '#af1ddd']}
          style={styles.container}
      >
        <Text style={styles.textStyle}>
          {"The dumb truck\n"}
        </Text>

        <CustomButton />

        {/* Add the LoginButton component */}
        <LoginButton navigation={navigation} />

        <StatusBar style="auto" />
      </LinearGradient>
  );
};

const SecondScreen = ({ navigation }) => {
  return (
      <LinearGradient
          colors={['#884fcc', '#3fcffb', '#af1ddd']}
          style={styles.container}
      >
        <TouchableOpacity
            style={styles.customButtonContainer}
            onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.customButtonText}>Go to First Screen</Text>
        </TouchableOpacity>
      </LinearGradient>
  );
};

const LoginScreen = () => {
  return (
      <LinearGradient
          colors={['#884fcc', '#3fcffb', '#af1ddd']}
          style={styles.container}
      >
        {/* Your Login Screen components go here */}
        <Text style={styles.textStyle}>Welcome to the Login Screen</Text>
      </LinearGradient>
  );
};

const CustomButton = () => {
  return (
      <TouchableOpacity
          style={styles.customButtonContainer}
          onPress={() => Alert.alert('Mi scarba de tine', 'Fuck off mate.')}
      >
        <Text style={styles.customButtonText}>Ce ai cu button-u meu bah?</Text>
      </TouchableOpacity>
  );
};

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
            tabBar={() => null} // Add this line
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Second" component={SecondScreen} />
          <Tab.Screen name="Login" component={LoginScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textStyle: {
    fontStyle: 'italic',
    fontSize: 22,
    color: '#070708',
    textAlign: 'center',
  },
  customButtonContainer: {
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 15,
    width: 200,
    alignItems: 'center',
  },
  customButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginButton: {
    position: 'absolute',
    top: 50, // Adjust top position as needed
    right: 10, // Adjust right position as needed
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 10,
    width: 100, // Adjust width as needed
    alignItems: 'center',
  },
});
