import 'expo-dev-client';
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./tabs";
import { Keyboard } from "react-native";


export default function App() {
	const [keyboardStatus, setKeyboardStatus] = useState(false);

	useEffect(() => {
		const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
			setKeyboardStatus(true);
		});
		const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardStatus(false);
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	return (
		<NavigationContainer>
			<Tabs keyboardStatus={keyboardStatus} />
		</NavigationContainer>
	);
}
