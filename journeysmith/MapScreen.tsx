import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import PinOverlay from './PinOverlay';

type RouteParams = {
    params: {
        imageUri: string;
    };
};

const { width, height } = Dimensions.get('window');

const MapScreen = () => {
    const route = useRoute<RouteProp<RouteParams, 'params'>>();
    const { imageUri } = route.params;
    const [showOverlay, setShowOverlay] = useState(false); // State to toggle PinOverlay

    const handleToggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };

    return (
        <View style={styles.container}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : null}
            {showOverlay && <PinOverlay />}
            <TouchableOpacity style={styles.fab} onPress={handleToggleOverlay}>
                <Text style={styles.fabText}>{showOverlay ? 'VIEW' : 'EDIT'}</Text>
            </TouchableOpacity>
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
    image: {
        width: width - 20,
        height: height - 20,
        resizeMode: 'contain',
        borderColor: '#rgba(105, 63, 27,1)',
        backgroundColor: '#rgba(105, 63, 27,1)',
        borderRadius: 10,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        padding: 10,
        backgroundColor: '#0052cc',
        borderRadius: 5,
        zIndex: 1000, // Ensure the button stays above all other elements
    },
    fabText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default MapScreen;
