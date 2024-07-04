import React, { useEffect } from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import GrafScreen from "./screens/GrafScreen";
import ToDoScreen from "./screens/ToDoScreen";
import SavedScreen from "./screens/SavedScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

export default function Tabs({ keyboardStatus }) {
	const navigation = useNavigation(); // Инициализируем хук useNavigation
	const { t, i18n } = useTranslation();

	useEffect(() => {
		({ route }) => {
			console.log("🚀 ~ Tabs ~ route:", route)
			return
		}
		navigation.setParams({ keyboardStatus }); // Передаем параметр keyboardStatus через навигацию
	}, [keyboardStatus]);

	// console.log("Tabs=keyboardStatus=", keyboardStatus);
	return (
		<Tab.Navigator 
			initialRouteName="Graf"
			screenOptions={({ route }) => ({
				// tabBarShowLabel: false,
				// headerShown:false,
				headerTitleAlign: "center",
				tabBarActiveTintColor: "#464",
				tabBarInactiveTintColor: "gray",
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === "Graf") {
						// iconName = focused ? "calendar" : "calendar-outline";
						focused ? (size = 36, iconName = "calendar") : (size = 30, iconName = "calendar-outline");
						// } else if (route.name === "Settings") {
						// 	iconName = focused ? "settings" : "settings-outline";
					}else if (route.name === "ToDo") {
						// iconName = focused ? "file-document-edit" : "file-document-edit-outline";
						focused ? (size = 36, iconName = "file-document-edit") : (size = 30, iconName = "file-document-edit-outline");
						return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
					} else if (route.name === "Save") {
						// iconName = focused ? "content-save-all" : "content-save-all-outline";
						focused ? (size = 36, iconName = "content-save-all") : (size = 30, iconName = "content-save-all-outline");
						return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
					} else if (route.name === "Settings") {
						focused ? (size = 36, iconName = "settings") : (size = 30, iconName = "settings-outline");						
					}
					// Можете использовать любые иконки из Ionicons или другие
					return <Ionicons name={iconName} size={size} color={color} />;
				},

				tabBarLabel: ({ color }) => {
					if (route.name === "ToDo") {
						return (
							<Text style={{ fontSize: 14, color, bottom: 10 }}>{t("todo")}</Text>
						);
					}
					if (route.name === "Save") {
						return (
							<Text style={{ fontSize: 14, color, bottom: 10 }}>{t("todo")}</Text>
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
					// zIndex:10,
					
				},
			})}
		>

			<Tab.Screen
				name="Graf"
				component={GrafScreen}
				options={{
					// title: "График =================",
					headerShown: false,
					headerStyle: {
						height: 40,
						// backgroundColor: "lightblue",
						borderTopWidth: 0,
						// borderColor: "#000000",
					},
				}}
			/>

			<Tab.Screen
				name="ToDo"
				component={ToDoScreen}
				// initialParams={{ handleUpdateData }}
				options={{
					lazy: false,
					// tabBarShowLabel: true,
					tabBarHideOnKeyboard: true,
					headerShown: false,
				}}
			/>

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
				name="Settings"
				component={SettingsScreen}
				options={{
					headerShown: false,
				}}
			/>

		</Tab.Navigator>
	);
}
