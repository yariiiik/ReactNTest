import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const GlassmorphismButton = ({ title, onPress, MyStyle }) => (
  <Pressable
    style={({ pressed }) => [styles.button, pressed && styles.pressedButton ]}
    onPress={onPress}  >
    {({ pressed }) => (
         <Text style={[styles.buttonText, pressed && styles.pressedButtonText,MyStyle&&{...MyStyle}]}>
          {title}
        </Text>

    )}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(155, 155, 155, 0.5)',
    marginVertical: 5,
    justifyContent: 'center',
  },
  pressedButton: {
    // backgroundColor: '#f88',
  },
  buttonText: {
    color: '#333',
    borderWidth: 0,
    textAlign: 'center',
    fontSize: 30,
    textAlignVertical: 'center',
    fontWeight: '500',
    
  },
  pressedButtonText: {
    // color: '#555',
    fontSize: 28,
  },
});

export default GlassmorphismButton;
