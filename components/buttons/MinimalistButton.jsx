import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const MinimalistButton = ({ title, onPress, MyStyle }) => (
  <Pressable
    style={({ pressed }) => [styles.button, pressed && styles.pressedButton]}
    onPress={onPress}
  >
    {({ pressed }) => (
      <Text style={[styles.buttonText, pressed && styles.pressedButtonText, MyStyle && { ...MyStyle }]}>
        {title}
      </Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#333333',
    borderRadius: 25,
    paddingVertical: 10,
    minWidth:40,
  },
  pressedButton: {
    shadowOffset: { width: -10, height: -10 },
    shadowRadius: 2,
    borderColor: '#555555',
  },
  buttonText: {
    color: '#333333',
    textAlign: 'center',
    fontSize: 16,
  },
  pressedButtonText: {
    color: '#555555',
  },
});

export default MinimalistButton;
