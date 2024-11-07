import React, { useState } from 'react';
import { View, PanResponder, StyleSheet, Text, TouchableOpacity } from 'react-native';

const DraggablePin = ({ initialPosition, onDragEnd, draggable, onPress }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => draggable,
    onPanResponderGrant: () => {
      if (draggable) {
        setIsDragging(true);
      }
    },
    onPanResponderMove: (e, gestureState) => {
      if (isDragging) {
        setPosition({
          x: gestureState.moveX - 15, // Adjust for centering the pin
          y: gestureState.moveY - 15,
        });
      }
    },
    onPanResponderRelease: () => {
      if (isDragging) {
        setIsDragging(false);
        onDragEnd(position);
      }
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        {...panResponder.panHandlers}
        style={[styles.pinContainer, { top: position.y, left: position.x }]}
      >
        <View style={styles.pin}>
          <Text style={styles.pinText}>📍</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pinContainer: {
    position: 'absolute',
    width: 60, // Double the original size for easier dragging
    height: 60, // Double the original size for easier dragging
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  pin: {
    width: 30, // Original pin size
    height: 30, // Original pin size
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15, // Make it circular
  },
  pinText: {
    fontSize: 24,
    color: 'grey',
  },
});

export default DraggablePin;
