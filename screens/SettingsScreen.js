import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SettingsScreen() {
	return (
		<View style={styles.container}>
			<Text>Press me</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
