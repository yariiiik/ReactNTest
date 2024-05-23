import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, FlatList } from "react-native";
import Header from "../components/Header";
import List from "../components/List";
import Form from "../components/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
	useSharedValue,
	withSpring,
	useAnimatedStyle,
} from "react-native-reanimated";

export default function HomeScreen({ route, navigation }) {
	let keyboardStatus = false;
	let donetodo = 0;
	console.log("HomeScreen -> route.params", route.params);
	// const { handleUpdateData } = route.params;

	if (route.params && route.params.keyboardStatus !== undefined) {
		keyboardStatus = route.params.keyboardStatus;
	}

	const [listtodos, setListtodos] = useState([
		{
			text: "Создать первое напоминание)",
			key: "" + Date.now(),
			checked: false,
		},
	]);

	listtodos.forEach((el) => (el.checked ? ++donetodo : null));
	let notdonetodo = listtodos.length - donetodo;

	console.log("HomeScreen -> donetodo", donetodo);
	useEffect(() => {
		navigation.setOptions({ tabBarBadge: notdonetodo || null });
		// handleUpdateData(notdonetodo);
	}, [listtodos]);

	const widthAnim = useSharedValue(
		`${(donetodo / listtodos.length || 0) * 100}%`
	);
	widthAnim.value = withSpring(`${(donetodo / listtodos.length || 0) * 100}%`, {
		stiffness: 500,
		damping: 20,
	});

	useEffect(() => {
		AsyncStorage.getItem("myKey")
			.then((value) => {
				if (value !== null) {
					setListtodos(JSON.parse(value));
				}
			})
			.catch((error) => console.log(error));
	}, []);

	const addTask = (inptext) => {
		setListtodos((prevListtodos) => {
			const newListtodos = [
				{ text: inptext, key: "" + Date.now(), checked: false },
				...prevListtodos,
			];
			saveData(newListtodos); // Вызываем saveData с новым списком задач
			return newListtodos;
		});
	};

	const deleteElement = (key) => {
		setListtodos((prevListtodos) => {
			const newListtodos = prevListtodos.filter((item) => item.key != key);
			saveData(newListtodos);
			return newListtodos;
		});
	};

	const toggleCheckbox = (key) => {
		setListtodos((prevListtodos) => {
			const newListtodos = prevListtodos.map((item) => {
				if (item.key === key) {
					item.checked = !item.checked; // Изменяем состояние checked
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

	const saveTodo = async (key) => {
		try {
			const value = await AsyncStorage.getItem("myKey");
			const existingValue = await AsyncStorage.getItem("saved_todo");			
			if (value !== null) {
				let jsonValue = JSON.parse(value);
				let element = jsonValue.find((el) => el.key == key);
				
				let updatedValue = JSON.parse(existingValue);
				updatedValue.push(element);
				updatedValue = JSON.stringify(updatedValue);

				await AsyncStorage.setItem("saved_todo", updatedValue);
			}
		} catch (e) {
			console.error(e);
		}
	};

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
