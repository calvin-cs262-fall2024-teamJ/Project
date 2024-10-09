import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native';
import DraggablePin from './DraggablePin';

const PinOverlay = ({ children }) => {
  const [pins, setPins] = useState([]);
  const [mode, setMode] = useState('inactive'); // 'inactive', 'normal', 'place', 'drag' 

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'a') {
        setMode((prevMode) => (prevMode === 'inactive' ? 'normal' : 'inactive'));
      } else if (event.key === 'p') {
        setMode((prevMode) => (prevMode === 'place' ? 'normal' : 'place'));
      } else if (event.key === 'm') {
        setMode((prevMode) => (prevMode === 'drag' ? 'normal' : 'drag'));
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handlePress = (event) => {
    if (mode !== 'place') return;
    const { pageX, pageY } = event.nativeEvent;
    setPins([...pins, { x: pageX, y: pageY }]);
  };

  const handleDragEnd = (index, newPosition) => {
    const updatedPins = [...pins];
    updatedPins[index] = newPosition;
    setPins(updatedPins);
  };

  return (
    <>
      {children}
      {mode !== 'inactive' && (
        <View style={styles.overlay}>
          {pins.map((pin, index) => (
            <TouchableOpacity key={index} onPress={() => mode === 'normal' && /* EDIT */ alert('Pin clicked!')}>
              <DraggablePin
                initialPosition={pin}
                onDragEnd={(newPos) => handleDragEnd(index, newPos)}
                draggable={mode === 'drag'}
              />
            </TouchableOpacity>
          ))}
          {mode === 'place' && (
            <TouchableWithoutFeedback onPress={handlePress}>
              <View style={styles.touchArea} />
            </TouchableWithoutFeedback>
          )}
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Press 'a' to toggle inactive mode</Text>
        <Text style={styles.infoText}>Press 'p' to toggle pin placement mode</Text>
        <Text style={styles.infoText}>Press 'm' to toggle pin drag mode</Text>
        <Text style={styles.currentMode}>Current Mode: {mode}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
  },
  touchArea: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  infoText: {
    color: 'white',
    marginVertical: 5,
  },
  currentMode: {
    color: 'yellow',
    marginTop: 10,
    fontWeight: 'bold',
  },
  pointerEventsAuto: {
    pointerEvents: 'auto', // Allow interactions in place mode
  },
});

export default PinOverlay;
