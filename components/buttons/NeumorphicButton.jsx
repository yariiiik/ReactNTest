import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const NeumorphicButton = ({ title, onPress, MyStyle, MyStyleBTN  }) => (
  <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressedButton, MyStyleBTN&&{...MyStyleBTN}]} onPress={onPress} >
    {({ pressed }) => (
      <Text style={[styles.buttonText, pressed && styles.pressedButtonText,MyStyle&&{...MyStyle}]}>
        {title}
      </Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(255, 255, 255, .95)',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(155, 155, 155, 0.5)',
    elevation: 10,
    marginVertical: 5,
    justifyContent:"center" 
  },
  pressedButton: {
    elevation: 6,
  },
  buttonText: {
    color: '#333333',
    textAlign: 'center',
    fontSize: 30,
    textAlignVertical: 'center',
  },
  pressedButtonText: {
    color: '#555',
    fontSize: 28,
  },
});

export default NeumorphicButton;
