import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolateColor } from 'react-native-reanimated';

export default function PostScreen() {
	const progress = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				progress.value,
				[0, 1],
				['red', 'green']
			),
		};
	});

	return (
		<View style={styles.container}>
			<Animated.View style={[{ width: 100, height: 100 }, animatedStyle]} />
			<Button
				onPress={() => {
					progress.value = withTiming(1 - progress.value, { duration: 1000 });
				}}
				title="run animation"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
