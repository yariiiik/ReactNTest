import React, { useEffect } from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "./screens/HomeScreen";
import PostScreen from "./screens/PostScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function Tabs({ keyboardStatus }) {
	const navigation = useNavigation(); // Инициализируем хук useNavigation
	useEffect(() => {
	    navigation.setParams({ keyboardStatus }); // Передаем параметр keyboardStatus через навигацию
	}, [keyboardStatus]);

	console.log("Tabs=", keyboardStatus);
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
					} else if (route.name === "Post") {
						iconName = focused ? "balloon" : "balloon-outline";
					} else if (route.name === "Settings") {
						iconName = focused ? "settings" : "settings-outline";
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
			<Tab.Screen name="Post" component={PostScreen} />
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				// initialParams={{ keyboardStatus: keyboardStatus }}
				options={{
					tabBarShowLabel: true,
					tabBarHideOnKeyboard: true,
					headerShown: false,
				}}
			/>

			<Tab.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					// title: "настрійки))",
					headerShown: false,
				}}
			/>
		</Tab.Navigator>
	);
}
