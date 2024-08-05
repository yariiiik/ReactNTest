import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const SaveAndDellButton = ({ title, onPress, SaveOrDell, myStyle, MyStyleBTN }) => (
	<Pressable style={({ pressed }) => [styles.buttoneround, SaveOrDell ? styles.saveButton : styles.dellButton, pressed && styles.pressedButton, pressed && (SaveOrDell ? styles.pressedSaveButton : styles.pressedDellButton), MyStyleBTN && { ...MyStyleBTN }]} onPress={onPress}>
		{({ pressed }) => (
			<Text style={[styles.buttonText, myStyle && { ...myStyle }]}>
				{title}
			</Text>
		)}
	</Pressable>
);

const styles = StyleSheet.create({
	buttoneround: {
		width: "50%",
		marginHorizontal: "25%",
		borderWidth: 1,
		borderRadius: 5,
		marginVertical: 5,
	},
	pressedButton: {
		marginTop: 3,
		marginBottom: 1,
	},

	saveButton: {
		backgroundColor: "skyblue",
		borderColor: "#33aaff",
	},
	pressedSaveButton: {
		backgroundColor: "#33aaff",
	},

	dellButton: {
		backgroundColor: "lightcoral",
		borderColor: "#b33",
	},
	pressedDellButton: {
		backgroundColor: "#b33",
	},

	buttonText: {
		textAlign: "center",
		// borderWidth: 1,
		fontSize: 26,
		fontWeight: "900",
		color: "white",
		paddingBottom: 2,
	}
});

export default SaveAndDellButton;
