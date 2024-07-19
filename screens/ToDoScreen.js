import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, FlatList, ImageBackground, Alert } from "react-native";
import SaveAndDellButton from "../components/buttons/SaveAndDellButton";
import Header from "../components/Header";
import List from "../components/List";
import Form from "../components/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { useSharedValue, withSpring, useAnimatedStyle, } from "react-native-reanimated";
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function ToDoScreen({ route, navigation }) {
	// console.log("🚀 ~ ToDoScreen ~ navigation:", navigation.getState().routes)
	console.log("ToDoScreen -> route.params", route.params);
	const { t, i18n } = useTranslation();
	const [refreshCount, setRefreshCount] = useState(0);
	const [listener, setListener] = useState("");
	const [listtodos, setListtodos] = useState([
		{
			text: t("сreatefirst"),
			key: "" + Date.now(),
			checked: false,
			save: false,
		},
	]);
	let keyboardStatus = route.params?.keyboardStatus || false;
	let donetodo = 0;
	console.log("\n🚀 🚀  ~ ToDoScreen ~ listener:", listtodos)

	useEffect(() => {
		// Устанавливаем колбэк в параметры маршрута
		navigation.setParams({ refreshCount, refreshCallback: () => setRefreshCount(prev => prev + 1) ,});
	}, [navigation]);

	listtodos.forEach((el) => (el.checked ? ++donetodo : null));
	let notdonetodo = listtodos.length - donetodo;
	useEffect(() => { navigation.setOptions({ tabBarBadge: notdonetodo || null }) }, [listtodos,refreshCount]);

	const widthAnim = useSharedValue(
		`${(donetodo / listtodos.length || 0) * 100}%`
	);
	widthAnim.value = withSpring(`${(donetodo / listtodos.length || 0) * 101}%`, {
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
	}, [refreshCount, listener]);

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
						saveTodo(item);
					} else { item.checked = !item.checked }
					console.log("*************🚀************* ~ newListtodos ~ item:", item)

				}
				return item;
			});
			saveData(newListtodos); // Сохраняем изменения
			return newListtodos;
		});
	};

	const saveData = async (newListtodos) => {
		console.log("\n\n🚀 🚀 🚀 ~ saveData ~ newListtodos:", newListtodos)
		try {
			await AsyncStorage.setItem("myKey", JSON.stringify(newListtodos));
			// console.log('Данные сохранены:\n', newListtodos);
		} catch (error) {
			alert("Ошибка - " + error);
			console.log(error);
		}
	};

	const saveTodo = async (item) => {
		let newItem = { ...item };
		console.log("\n\n🚀 ~ saveTodo ~ item:", item);
		console.log("🚀 ~ saveTodo ~ newItem:", newItem);

		try {
			const existingValue = await AsyncStorage.getItem("saved_todo");
			let updatedValue;
			if (existingValue !== null) {
				updatedValue = JSON.parse(existingValue);
				if (updatedValue.some((el) => el.key == newItem.key)) {
					alert("This todo has already been saved");
				} else {
					newItem.checked = false;
					updatedValue.unshift(newItem);
					updatedValue = JSON.stringify(updatedValue);
				}
			} else { updatedValue = JSON.stringify([newItem]) }

			await AsyncStorage.setItem("saved_todo", updatedValue);
			trigger(Date.now());
		} catch (e) {
			console.error(e);
		} console.log("\n\n22🚀22 ~ saveTodo ~ item:", item)
	};

	async function trigger(DateNow) { await AsyncStorage.setItem("trigger", DateNow + ""); }

	const widthStyle = useAnimatedStyle(() => {
		return {
			width: widthAnim.value,
		};
	});

	const dellAllToDo = () => {
		Alert.alert(
			t("confirm"),
			t("areyousure"),
			[{text: t("cancel"), style: "cancel"},{ text: t("ok"), onPress: () => {
				setListtodos(() => {
					const newListtodos = [];
					saveData(newListtodos);
					trigger(Date.now());
					return newListtodos;
				});
			}}],
			{ cancelable: true }
		);		
	};

	const renderFooterFlatList = () => {
		if (listtodos.length > 5) {
		return (<SaveAndDellButton title={t("dellalltodo")} onPress={dellAllToDo} SaveOrDell={0} myStyle={{fontSize:16,color:"#444"}}/>);
		}
		return null;
	};

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				source={require("../assets/asfalt.png")}
				style={styles.backgroundImage}
				resizeMode="repeat">
				<StatusBar
					animated={true}
					barStyle={"light-content"}
					style={styles.stausba}
					hidden={false}
					showHideTransition={"slide"}
					backgroundColor={"#EEEEAA"}
					// currentHeight="50%"
					translucent={false}
					networkActivityIndicatorVisible={true}
				/>
				<Header listlen={listtodos.length} donetodo={donetodo} title={t("titletodo")}/>

				<View style={styles.body}>
					<View style={{ flexDirection: "row", justifyContent: "left" }}>
						<Animated.View style={[widthStyle]}>
							<View style={[styles.progress, { backgroundColor: `rgba(${255 - (donetodo / listtodos.length) * 148},${(donetodo / listtodos.length) * 158},34,.9)`	}]}
							>
							</View>
						</Animated.View>
						<View style={styles.redBoll}>
						</View>
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
						ListFooterComponent={renderFooterFlatList}
					/>
					<Form addTask={addTask} title={t("WriteNotes")} btntitle={t("save")}/>
				</View>
				<View style={{ height: keyboardStatus ? 0 : 90 }}></View>
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "snow",
		alignItems: "center",
		justifyContent: "center",
	},
	body: {
		flex: 1,
		width: "100%",
		// backgroundColor: "snow",
		// borderWidth: 1,
		justifyContent: "space-evenly",
		zIndex: 1,		
	},
	progress: {
		height: 3,		
	},
	redBoll: {
		width: 10,
		height: 10,
		backgroundColor: "#e24",
		borderRadius: 5,
		zIndex: 1000,
		overflow: "visible",
		top: -4,
		left:-10
	},
	backgroundImage: {
		width: '100%',
		height: '100%',
	},
});
