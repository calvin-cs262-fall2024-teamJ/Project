import React from 'react';
import { View, Image, StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import { useRoute, RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

type RouteParams = {
    params: {
        imageUri: string;
    };
};

type RootStackParamList = {
    Home: undefined;
    MapList: undefined;
    MapScreen: { imageUri: string };
};

const { width, height } = Dimensions.get('window');

// MapScreen component
const MapScreen = () => {
    const route = useRoute<RouteProp<RouteParams, 'params'>>();
    const { imageUri } = route.params;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    console.log('Received imageUri:', imageUri); // For debugging

    const pinX = useSharedValue(50);
    const pinY = useSharedValue(50);

    return (
        <View style={styles.container}>
            {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
            ) : null}
            <Pressable style={styles.returnButton} onPress={() => navigation.goBack()}>
                <Text style={styles.returnButtonText}>Return to map list</Text>
            </Pressable>
        </View>
    );
}

// Styles for the map component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#rgba(105, 63, 27,1)',
    },
    image: {
        width: width - 20,
        height: height - 20,
        resizeMode: 'contain',
        borderColor: '#rgba(105, 63, 27,1)',
        backgroundColor: '#rgba(105, 63, 27,1)',
        borderRadius: 10,
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
    pinButton: {
        backgroundColor: '#rgba(245, 245, 220, 1)',
        width: 10,
        height: 10,
        borderRadius: 5,
        borderColor: '#rgba(245, 245, 220, 1)',
    },
    zoomableView: {

    },
});

export default MapScreen;