import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const MapList = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: .5,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  }
  return (
    <View style={styles.container}>
      <Pressable style={styles.topRightButton} onPress={pickImage}>
        <Image
          source={require('@/assets/images/add-map-button.png')}
          style={styles.profileImage}
        />
      </Pressable>
      <Pressable>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
        )}
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
  topRightButton: {
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
  uploadedImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderWidth: 16,
    borderColor: '#rgba(0, 0, 0, .8)',
    borderRadius: 20,
    position: 'absolute',
    top: -443,
    left: -700,
  },
});

export default MapList;