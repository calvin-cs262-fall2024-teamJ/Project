import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

type HomeScreenProps = {
  navigation: NavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('@/assets/images/home-screen-map.jpg')} // Ensure this path is correct
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.welcomeText}>Welcome to the Home Screen</Text>
        <Button
          title="Go to maps"
          onPress={() => navigation.navigate('MapList')} // Ensure this navigates to MapList
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)', // Optional: Adds a semi-transparent overlay
  },
  welcomeText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 20,
  },
});

export default HomeScreen;