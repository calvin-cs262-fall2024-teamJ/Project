import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';

//Define RootStackParamList
type RootStackParamList = {
  Home: undefined;
  MapList: undefined;
  MapScreen: { imageUri: string };
};

function MapList() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.topLeftButton} onPress={pickImage}>
          <Image
            source={require('./assets/add-map-button.png')}
            style={styles.profileImage}
          />
        </Pressable>
        {selectedImage && (
          <Pressable onPress={() => navigation.navigate('MapScreen', { imageUri: selectedImage })}>
            <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
          </Pressable>
        )}
      </View>
      <Pressable style={styles.returnButton} onPress={() => navigation.goBack()}>
        <Text style={styles.returnButtonText}>Return to home screen</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#rgba(105, 63, 27,1)',
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
  },
  topLeftButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 150,
    height: 150,
  },
  profileImage: {
    width: 150,
    height: 150,
  },
  uploadedImage: {
    position: 'relative',
    top: 10,
    left: 170,
    width: 150,
    height: 150,
    borderRadius: 10,
    borderColor: '#rgba(235, 235, 200, 1)',
    borderWidth: 10,
  },
  returnButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: '#rgba(245, 245, 220, 1)',
    borderRadius: 10,
  },
  returnButtonText: {
    color: '#000',
  },
});

export default MapList;