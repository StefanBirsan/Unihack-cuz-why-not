import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import MapView, {Callout, Marker} from "react-native-maps";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import LoginScreen  from "./LoginScreen";
import {onAuthStateChanged, User} from "firebase/auth";
import {FIREBASE_AUTH} from "./firebase";



const Stack = createStackNavigator();

const InsideStack = createStackNavigator();

function InsideLayout() {
    return (
        <InsideStack.Navigator>
            <InsideStack.Screen name="Second" component={SecondScreen} />
        </InsideStack.Navigator>

    );
}

const CustomButton = ({ title, message }) => {
    const handleButtonPress = () => {
        Alert.alert(title, message);
    };

    return (
        <TouchableOpacity
            style={styles.customButtonContainer}
            onPress={handleButtonPress}
        >
            <Text style={styles.customButtonText}>{title}</Text>
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
                      <CustomButton title = "FRQ" message="nothing much atm"/>
                      <CustomButton title = "Info" message="nothing much atm"/>
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
    const handleGoToMapPress = () => {
        navigation.navigate('Map');
    };
    const goToHomeScreen = () => {
        navigation.navigate('Home');
    };

    return (
        <LinearGradient colors={['#000000', '#A55233']} style={styles.container}>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.customButtonContainer, styles.customButtonContainer]}
                    onPress={goToHomeScreen}
                >
                    <Text style={[styles.customButtonText, styles.customBT]}>
                        Go to Home Screen
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.customButtonContainer, styles.customButtonContainer]}
                    onPress={handleGoToMapPress}
                >
                    <Text style={[styles.customButtonText, styles.customBT]}>
                        Go to Map Screen
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};


const MapScreen = ({navigation}) => {
    const onRegionChange = (region) => {
        console.log(region);
    };

    const [region, setRegion] = React.useState({
        latitude: 45.7494,
        longitude: 21.2272,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const handleGoBackToSecondPress = () => {
        navigation.navigate('Second');
    };

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
                    <Text>Hello there</Text>
                </Callout>
            </Marker>

            </MapView>

            <TouchableOpacity
                style={styles.goBackButton}
                onPress={handleGoBackToSecondPress}
            >
                <Text style={styles.goBackButtonText}>Go back to the main screen</Text>
            </TouchableOpacity>

        </View>
    );
};



export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log('user', user);
            setUser(user);
        });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={user ? 'Second' : 'Login'}
                headerMode="none"
            >
                {user ? (
                    // Authenticated screens
                    <>
                        <Stack.Screen name="Second" component={SecondScreen} />
                        {/* Add other authenticated screens here */}
                    </>
                ) : (
                    // Non-authenticated screens
                    <>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                        {/* Include other screens for non-authenticated state here */}
                    </>
                )}

                <Stack.Screen name="Map" component={MapScreen} />
            </Stack.Navigator>
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
    backgroundColor: '#3d4737',
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
    titleL: {
        fontSize: 24,
        marginBottom: 16,
        color: 'white',
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%', // Make the input container take the full width
        backgroundColor: 'white',
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 8,
    },
    loginButt: {
        backgroundColor: 'blue',
        borderRadius: 8,
        padding: 12,
        marginTop: 16,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    goBackButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 8,
        alignItems: 'center',
    },
    goBackButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonRowf: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    customBT: {
        fontSize: 16, // Adjusted font size for smaller text
    },
});