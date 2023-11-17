import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  return (
      <LinearGradient
          colors={['#884fcc', '#3fcffb', '#af1ddd']}
          style={styles.container}
      >
        <Text style={styles.textStyle}>
          {"The dumb truck\n"}
        </Text>


        <CustomButton />
        <TouchableOpacity
            style={styles.customButtonContainer}
            onPress={() => Alert.alert('Mi scarba de tine', 'Fuck off mate.')}
        >
          <Text style={styles.customButtonText}>Ce ai cu button-u meu bah?</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </LinearGradient>
  );
};

const SecondScreen = () => {
  return (
      <LinearGradient
          colors={['#884fcc', '#3fcffb', '#af1ddd']}
          style={styles.container}
      >
        <TouchableOpacity
            style={styles.customButtonContainer}
            onPress={() => Alert.alert('Mi scarba de tine', 'Fuck off mate.')}
        >
          <Text style={styles.customButtonText}>Go to First Screen</Text>
        </TouchableOpacity>
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
            tabBarOptions={{
              activeTintColor: 'white',
              inactiveTintColor: 'gray',
              style: { backgroundColor: 'blue' },
              indicatorStyle: { backgroundColor: 'white' },
            }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Second" component={SecondScreen} />
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
  textInputStyle: {
    backgroundColor: '#b691ed',
    padding: 10,
    borderRadius: 10,
    width: 200,
    color: '#FFFFDD',
    borderColor: '#000',
    borderWidth: 3,
    borderStyle: 'solid',
    marginTop: 20,
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
});
