import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity, Button, Modal, TextInput } from 'react-native';
import DraggablePin from './DraggablePin';

const PinOverlay = ({ children }) => {
  const [pins, setPins] = useState([]);
  const [mode, setMode] = useState('movePin');
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPins, setShowPins] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showWrite, setShowWrite] = useState(false);
  const [showText, setShowText] = useState(false);
  const [pinToDelete, setPinToDelete] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [pinText, setPinText] = useState('');

  const toggleMode = (newMode) => {
    setMode(newMode);
  };

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
    if (showOverlay) {
      setMode('normal');
    } else {
      setMode('movePin');
    }
  };

  const togglePinsVisibility = () => {
    setShowPins(!showPins);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'a') {
        togglePinsVisibility();
      } else if (e.key === 'p') {
        setMode((prevMode) => (prevMode === 'place' ? 'movePin' : 'place'));
      } else if (e.key === 'd') {
        setMode((prevMode) => (prevMode === 'delete' ? 'movePin' : 'delete'));
      } else if (e.key === 'w') {
        setMode((prevMode) => (prevMode === 'write' ? 'movePin' : 'write'));
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handlePress = (e) => {
    if (mode !== 'place') return;
    const { pageX, pageY } = e.nativeEvent;
    setPins([...pins, { x: pageX, y: pageY, id: Math.random().toString(36).substr(2, 9), text: '' }]);
  };

  const handleDeletePin = (id) => {
    setPins(pins.filter((pin) => pin.id !== id));
    setShowConfirm(false);
  };

  const handleWritePin = (pin) => {
    setSelectedPin(pin);
    setPinText(pin.text);
    setShowWrite(true);
  };

  const handleDragEnd = (id, newPosition) => {
    const updatedPins = pins.map((pin) =>
      pin.id === id ? { ...pin, x: newPosition.x, y: newPosition.y } : pin
    );
    setPins(updatedPins);
  };

  const handlePinClick = (pin) => {
    if (mode === 'delete') {
      setPinToDelete(pin.id);
      setShowConfirm(true);
    } else if (mode === 'write') {
      handleWritePin(pin);
    } else if (mode === 'normal') {
      setSelectedPin(pin);
      setShowText(true);
    } else {
      console.log('Pin clicked!');
    }
  };

  const savePinText = () => {
    const updatedPins = pins.map((pin) =>
      pin.id === selectedPin.id ? { ...pin, text: pinText } : pin
    );
    setPins(updatedPins);
    setShowWrite(false);
  };

  return (
    <View style={styles.overlayContainer}>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleOverlay}>
        <Text style={styles.toggleButtonText}>{showOverlay ? "VIEW" : "EDIT"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.activeToggleButton} onPress={togglePinsVisibility}>
        <Text style={styles.toggleButtonText}>{showPins ? "HIDE PINS" : "SHOW PINS"}</Text>
      </TouchableOpacity>

      {showPins && pins.map((pin) => (
        <DraggablePin
          key={pin.id}
          initialPosition={{ x: pin.x, y: pin.y }}
          onDragEnd={(newPos) => handleDragEnd(pin.id, newPos)}
          draggable={mode === 'movePin'}
          onPress={() => handlePinClick(pin)}
        />
      ))}

      {showOverlay && (
        <>
          {children}
          <View style={styles.leftPanel}>
            <Button title="Move Pin" onPress={() => toggleMode('movePin')} />
            <Button title="Place" onPress={() => toggleMode('place')} />
            <Button title="Delete" onPress={() => toggleMode('delete')} />
            <Button title="Write" onPress={() => toggleMode('write')} />
          </View>
          {mode === 'place' && (
            <TouchableWithoutFeedback onPress={handlePress}>
              <View style={styles.touchArea} />
            </TouchableWithoutFeedback>
          )}
          <View style={styles.statusBar}>
            <Text style={styles.statusText}>Current Mode: {mode}</Text>
          </View>
        </>
      )}

      {showText && selectedPin && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showText}
          onRequestClose={() => setShowText(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.textModalContainer}>
              <Text style={styles.textModalContent}>{selectedPin.text}</Text>
              <Button title="Close" onPress={() => setShowText(false)} />
            </View>
          </View>
        </Modal>
      )}

      {showWrite && selectedPin && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showWrite}
          onRequestClose={() => setShowWrite(false)}
        >
          <View style={styles.modalBackground}>
            <View style={[styles.modalContainer, styles.editModalBackground]}>
              <Text style={styles.modalText}>Edit Pin Text</Text>
              <TextInput
                style={styles.textInput}
                value={pinText}
                onChangeText={setPinText}
                placeholder="Enter text here..."
              />
              <View style={styles.modalButtonContainer}>
                <Button title="Save" onPress={savePinText} />
                <Button title="Close" onPress={() => setShowWrite(false)} />
              </View>
            </View>
          </View>
        </Modal>
      )}

      {showConfirm && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showConfirm}
          onRequestClose={() => setShowConfirm(false)}
        >
          <View style={styles.modalBackground}>
            <View style={[styles.modalContainer, styles.confirmModalBackground]}>
              <Text style={styles.modalText}>Are you sure you want to delete this pin?</Text>
              <View style={styles.modalButtonContainer}>
                <Button title="Cancel" onPress={() => setShowConfirm(false)} />
                <Button title="Yes" onPress={() => handleDeletePin(pinToDelete)} />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    zIndex: 20,
  },
  toggleButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    zIndex: 1000,
  },
  activeToggleButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    zIndex: 1000,
  },
  toggleButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  leftPanel: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    left: 0,
    top: 50,
    zIndex: 100,
  },
  activeOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
    pointerEvents: 'box-none',
  },
  touchArea: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 300,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
  textModalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textModalContent: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  editModalBackground: {
    backgroundColor: 'lightgrey',
  },
  confirmModalBackground: {
    backgroundColor: 'lightyellow',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default PinOverlay;
