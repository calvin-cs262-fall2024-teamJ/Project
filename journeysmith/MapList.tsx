import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Button, registerCallableModule } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


function MapList({ navigation }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });


    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  }
  return (
    <View style={styles.container}>
      <Pressable style={styles.topLeftButton} onPress={pickImage}>
        <Image
          source={require('./assets/add-map-button.png')}
          style={styles.profileImage}
        />
      </Pressable>
      <Pressable>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
        )}
      </Pressable>
      <Pressable style={styles.returnButton} onPress = {() => navigation.goBack()}>
        <Text style={styles.returnButtonText}>Return to home screen</Text>
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#rgba(50, 50, 50, 1)',
  },
  topLeftButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    opacity: 0.8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  returnButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#rgba(0, 0, 0, .8)',
    borderRadius: 5,
  },
  returnButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1, // Ensure text fits on one line
  },
  uploadedImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderWidth: 16,
    borderColor: '#rgba(0, 0, 0, .8)',
    borderRadius: 20,
    position: 'absolute',
    top: -437,
    left: -700,
  },
});


export default MapList;