import React, { useEffect } from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import SavedScreen from "./screens/SavedScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function Tabs({ keyboardStatus }) {
	const navigation = useNavigation(); // Инициализируем хук useNavigation

	useEffect(() => {
		navigation.setParams({ keyboardStatus }); // Передаем параметр keyboardStatus через навигацию
	}, [keyboardStatus]);

	// console.log("Tabs=keyboardStatus=", keyboardStatus);
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				// tabBarShowLabel: false,
				// headerShown:false,
				headerTitleAlign: "center",
				tabBarActiveTintColor: "#464",

				tabBarInactiveTintColor: "gray",
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === "Home") {
						iconName = focused ? "home" : "home-outline";
						focused ? (size = 30) : (size = 25);
					} else if (route.name === "Save") {
						iconName = focused ? "balloon" : "balloon-outline";
					} else if (route.name === "Graf") {
						iconName = focused ? "calendar" : "calendar-outline";
					// } else if (route.name === "Settings") {
					// 	iconName = focused ? "settings" : "settings-outline";
					}
					// Можете использовать любые иконки из Ionicons или другие
					return <Ionicons name={iconName} size={size} color={color} />;
				},

				tabBarLabel: ({ color }) => {
					if (route.name === "Home") {
						return (
							<Text style={{ fontSize: 14, color, bottom: 10 }}>To-do</Text>
						);
					}
					return null; // Скрыть метку для всех вкладок, кроме Home
				},

				tabBarStyle: {
					position: "absolute",
					borderRadius: 20,
					backgroundColor: "#ffa",
					height: 70,
					left: 20,
					right: 20,
					bottom: keyboardStatus ? 0 : 15,
					borderTopWidth: 0,
				},
			})}
		>
			<Tab.Screen
				name="Save"
				component={SavedScreen}
				options={{
					// title: "настрійки))",
					headerShown: false,
					// headerStyle: {
					// 	backgroundColor: "lightblue",
					// 	borderTopWidth: 3,
					// 	borderColor: "#000000",
					// },
				}}
			/>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				// initialParams={{ handleUpdateData }}
				options={{
					tabBarShowLabel: true,
					tabBarHideOnKeyboard: true,
					headerShown: false,
				}}
			/>

			<Tab.Screen
				name="Graf"
				component={SettingsScreen}
				options={{
					title: "График =================",
					headerShown: false,
					headerStyle: {
						height:40,
						// backgroundColor: "lightblue",
						borderTopWidth: 0,
						// borderColor: "#000000",
					},
				}}
			/>
		</Tab.Navigator>
	);
}
