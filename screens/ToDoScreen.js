import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, SafeAreaView, FlatList } from "react-native";
import Header from "../components/Header";
import List from "../components/List";
import Form from "../components/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { useSharedValue, withSpring, useAnimatedStyle, } from "react-native-reanimated";
import { useFocusEffect } from '@react-navigation/native';

export default function ToDoScreen({ route, navigation }) {
	// console.log("🚀 ~ ToDoScreen ~ navigation:", navigation.getState().routes)
	// console.log("ToDoScreen -> route.params", route.params);
	const [refreshCount, setRefreshCount] = useState(0);
	const [listener, setListener] = useState("");
	const [listtodos, setListtodos] = useState([
		{
			text: "Создать первое напоминание)",
			key: "" + Date.now(),
			checked: false,
			save: false,
		},
	]);
	let keyboardStatus = route.params?.keyboardStatus || false;
	let donetodo = 0;
	console.log("🚀 🚀  ~ ToDoScreen ~ listener:", listtodos)

	useEffect(() => {
		// Устанавливаем колбэк в параметры маршрута
		navigation.setParams({refreshCount, refreshCallback: () => setRefreshCount(prev => prev + 1) });
	}, [navigation]);

	listtodos.forEach((el) => (el.checked ? ++donetodo : null));
	let notdonetodo = listtodos.length - donetodo;
	useEffect(() => {navigation.setOptions({ tabBarBadge: notdonetodo || null })}, [listtodos]);

	const widthAnim = useSharedValue(
		`${(donetodo / listtodos.length || 0) * 100}%`
	);
	widthAnim.value = withSpring(`${(donetodo / listtodos.length || 0) * 100}%`, {
		stiffness: 500,
		damping: 20,
	});

	useFocusEffect(
		useCallback(() => {
			AsyncStorage.getItem("trigger")
				.then((value) => {
					console.log("🚀 ~ ToDoScreen ~ 🚀 trigger:", value)
					if (value !== null) { setListener(value) }
					else { AsyncStorage.setItem("trigger", Date.now() + "") }
				})
				.catch((error) => console.log(error))
		}, [])
	);

	useEffect(() => {
		AsyncStorage.getItem("myKey")
			.then((value) => {
				if (value !== null) {
					setListtodos(JSON.parse(value));
				}
			})
			.catch((error) => console.log(error));
	}, [refreshCount,listener]);

	const addTask = (inptext) => {
		setListtodos((prevListtodos) => {
			const newListtodos = [
				{ text: inptext, key: "" + Date.now(), checked: false, save: false },
				...prevListtodos,
			];
			saveData(newListtodos); // Вызываем saveData с новым списком задач
			trigger(Date.now());
			return newListtodos;
		});
	};

	const deleteElement = (key) => {
		setListtodos((prevListtodos) => {
			const newListtodos = prevListtodos.filter((item) => item.key != key);
			saveData(newListtodos);
			trigger(Date.now());
			return newListtodos;
		});
	};

	const toggleCheckbox = (key, save) => {
		setListtodos((prevListtodos) => {
			const newListtodos = prevListtodos.map((item) => {
				if (item.key === key) {// Изменяем состояние save или checked
					if (save) {
						item.save = !item.save;
						saveTodo(item)
					} else { item.checked = !item.checked }

				}
				return item;
			});
			saveData(newListtodos); // Сохраняем изменения
			return newListtodos;
		});
	};

	const saveData = async (newListtodos) => {
		try {
			await AsyncStorage.setItem("myKey", JSON.stringify(newListtodos));
			// console.log('Данные сохранены:\n', newListtodos);
		} catch (error) {
			alert("Ошибка - " + error);
			console.log(error);
		}
	};

	const saveTodo = async (item) => {
		try {
			const existingValue = await AsyncStorage.getItem("saved_todo");
			let updatedValue;
			if (existingValue !== null) {
				updatedValue = JSON.parse(existingValue);
				if (updatedValue.some((el) => el.key == item.key)) {
					alert("This todo has already been saved");
				} else {
					item.checked = false;
					updatedValue.unshift(item);
					updatedValue = JSON.stringify(updatedValue);
				}
			} else { updatedValue = JSON.stringify([item]) }

			await AsyncStorage.setItem("saved_todo", updatedValue);
			trigger(Date.now());
		} catch (e) {
			console.error(e);
		}
	};

	async function trigger(DateNow) { await AsyncStorage.setItem("trigger", DateNow + ""); }

	const widthStyle = useAnimatedStyle(() => {
		return {
			width: widthAnim.value,
		};
	});

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				animated={true}
				barStyle={"light-content"}
				style={styles.stausba}
				hidden={false}
				showHideTransition={"slide"}
				backgroundColor={"#eee8aa"}
				// currentHeight="50%"
				translucent={false}
				networkActivityIndicatorVisible={true}
			/>
			<Header listlen={listtodos.length} donetodo={donetodo} />

			<View style={[styles.body, { marginBottom: keyboardStatus ? 2 : 100 }]}>
				<View style={{ flexDirection: "row", justifyContent: "left" }}>
					<Animated.View style={[widthStyle]}>
						<View
							style={[
								styles.progress,
								{
                  /*width: `${(donetodo / listtodos.length) * 100}%`,*/ backgroundColor: `rgba(${255 - (donetodo / listtodos.length) * 148
										},${(donetodo / listtodos.length) * 158},34,.9)`,
								},
							]}
						></View>
					</Animated.View>
					<View
						style={{
							width: 10,
							height: 10,
							backgroundColor: "#e24",
							borderRadius: 5,
							zIndex: 1000,
							overflow: "visible",
							top: -4,
						}}
					></View>
				</View>

				<FlatList
					data={listtodos}
					renderItem={({ item }) => (
						<List
							element={item}
							deleteElement={deleteElement}
							toggleCheckbox={toggleCheckbox}
							saveTodo={saveTodo}
						/>
					)}
				/>
				<Form addTask={addTask} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#eea",
		alignItems: "center",
		justifyContent: "center",
	},

	body: {
		flex: 1,
		width: "100%",
		backgroundColor: "snow",
		borderWidth: 1,
		justifyContent: "space-evenly",
		zIndex: 1,
		paddingBottom: 5,
		borderWidth: 0,
	},
	progress: {
		height: 3,
	},
});
