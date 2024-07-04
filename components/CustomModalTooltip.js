import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const CustomModalTooltip = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  const toggleTooltip = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleTooltip}>
        {children}
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={toggleTooltip}
      >
        <TouchableOpacity style={styles.overlay} onPress={toggleTooltip}>
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>{content}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltip: {
    width: 250,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'blue',
  },
  tooltipText: {
    color: 'black',
    textAlign: 'center',
  },
});

export default CustomModalTooltip;
