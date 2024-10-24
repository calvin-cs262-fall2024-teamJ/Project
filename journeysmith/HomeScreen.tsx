import React from 'react';
import { ImageBackground, View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('./assets/home-screen-map.jpg')}
      style={styles.backgroundImage}
    >
      <Text style={styles.welcomeText}>Welcome to Journeysmith!</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate("MapList")}>
        <Text style={styles.buttonText}>Go to Map List</Text>
      </Pressable>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: width,
    height: height,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  button: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginTop: 10,
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#rgba(235, 235, 200, 1)',
    borderRadius: 5,
    borderColor: '#rgba(105, 63, 27,1)',
    borderWidth: 3,
  },
  buttonText: {
    color: '#000',
  },
});

export default HomeScreen;