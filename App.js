import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CommonActions } from '@react-navigation/native';
import MapView, {Callout, Marker} from "react-native-maps";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";


const Tab = createMaterialTopTabNavigator();

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
      <ImageBackground
          source={require('./pateu/background.jpg')}
          style={styles.containerImg}
      >
          <View style={styles.overlay}>
              <View style={styles.upperSection}>
                  <Image
                      source={require('./pateu/title.png')}
                      style={styles.logoImage}
                  />
              </View>

              <View style={styles.centeredSection}>
                  <View style={styles.buttonRow}>
                      <CustomButton />
                      <CustomButton />
                  </View>
              </View>

              <View style={styles.topRightSection}>
                  <LoginButton navigation={navigation} />
              </View>

              <StatusBar style="auto" />
          </View>
      </ImageBackground>
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

    const [region, setRegion] = React.useState({
        latitude: 45.7494,
        longitude: 21.2272,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });


    return (
        <View style={styles.containerMap}>
            <GooglePlacesAutocomplete
                placeholder='Search'
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: 'distance',
                }}
                onPress={(data, details = null) => {
                    console.log('Data:', data);
                    setRegion({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,

                    })
                }}
                onFail={(error) => console.error('Places Autocomplete Error:', error)}
                query={{
                    key: "AIzaSyCZpueyVlrCjIWW7OixQRA0U9iAgLeAk3s",
                    language: "en",
                    components: "country:ro",
                    types: ['establishment', 'address'],
                    radius: 30000,
                    location: `${region.latitude},${region.longitude}`,
                }}
                styles={{
                    container: { flex: 0, position: 'absolute', width: '100%' , zIndex: 1},
                    listView: { backgroundColor: 'white' },
                }}
            />
            <MapView
                style={styles.map}
                onRegionChange={onRegionChange}
                initialRegion={{
                  latitude: 45.7494,
                    longitude: 21.2272,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                provider="google"
            >
            <Marker coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
            }}
            />

            <Marker
                coordinate={{
                    latitude: 45.7494,
                    longitude: 21.2272,
                }}
                pinColor="black"
                draggable={true}
                onDragStart={(e) => {
                    console.log('Drag Start', e.nativeEvent.coordinate)
                }}
                onDragEnd={(e) => {
                    console.log('Drag End', e.nativeEvent.coordinate)
                }}
            >
                <Callout>
                    <Text>Ma-ta</Text>
                </Callout>
            </Marker>

            </MapView>
        </View>
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
    containerMap: {
       flex: 1,
       marginTop: 35,
    },
    containerImg: {
        flex: 1,

    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the overlay color and transparency as needed
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSM: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    upperSection: {
        alignItems: 'center',
        paddingTop: 125, // Increase the paddingTop to add more space
    },
    centeredSection: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    topRightSection: {
        position: 'absolute',
        top: 0,
        right: 20,
    },
    logoImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 20,
    },

});