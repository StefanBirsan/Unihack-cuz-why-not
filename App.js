import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CommonActions } from '@react-navigation/native';
import MapView, {Callout, Marker} from "react-native-maps";


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
        <Text style={styles.lButtonText}>Login</Text>
      </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
      <LinearGradient
          colors={['#000000', '#A55233']}
          style={styles.container}
      >
        <Text style={styles.textStyle}>
          {"Dump Alert\n"}
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
          colors={['#000000', '#A55233']}
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
          colors={['#000000', '#A55233']}
          style={styles.container}
      >
        {/* Your Login Screen components go here */}
        <Text style={styles.textStyle}>Welcome to the Login Screen</Text>
      </LinearGradient>
  );
};

const MapScreen = () => {
    const onRegionChange = (region) => {
        console.log(region);
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                onRegionChange={onRegionChange}
                initialRegion={{
                  latitude: 45.7494,
                    longitude: 21.2272,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
            <Marker
                coordinate={{
                    latitude: 45.7494,
                    longitude: 21.2272,
                }}
                pinColor="black"
            >
                <Callout>
                    <Text>Ma-ta</Text>
                </Callout>
            </Marker>

            </MapView>    
        </View>
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
          <Tab.Screen name="Login" component={LoginScreen}/>
          <Tab.Screen name="Map" component={MapScreen} />
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
    color: '#fff',
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
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    width: 100, // Adjust width as needed
    alignItems: 'center',
  },
    lButtonText: {
    color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
