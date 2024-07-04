import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Dimensions, FlatList, Alert, Pressable, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SaveAndDellButton from "../components/buttons/SaveAndDellButton";
import SavedList from "../components/SavedList";
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window'); // Получаем размеры экрана

export default function SavedScreen({ route, navigation }) {
	const { t, i18n } = useTranslation();
	const [valueAll, setValueAll] = useState({ "SSData": [], "TSData": [] });
	const [listener, setListener] = useState("");

	// console.log("🚀 ~ SavedScreen ~ valueAll:", valueAll)
	// console.log("🚀 ~ SavedScreen ~ listener", listener);

	const handleRefreshScreenB = () => {
		// Получаем колбэк из параметров маршрута и вызываем его
		const callback = navigation.getState().routes.find(route => route.name === 'ToDo')?.params?.refreshCallback;
		console.log("🚀 ~ handleRefreshScreenB ~ callback:", callback)
		if (callback) { callback() }
	};

	useFocusEffect(
		useCallback(() => {
			AsyncStorage.getItem("trigger")
				.then((data_trigger) => {
					console.log("🚀 ~ SavedScreen ~ 🚀 trigger:", data_trigger)
					if (data_trigger !== null) { setListener(data_trigger) }
					else { AsyncStorage.setItem("trigger", Date.now() + "") }
				})
				.catch((error) => console.log(error))
		}, [])
	);

	useEffect(() => {
		const fetchData = async () => {
			try {//{SavedScreenData:[],ToDoScreenData:[]}
				let SSData = await AsyncStorage.getItem("saved_todo");
				if (SSData !== null) {
					SSData = JSON.parse(SSData);
					let TSData = await AsyncStorage.getItem("myKey");
					if (TSData !== null) {
						TSData = JSON.parse(TSData);
						SSData.map((item) => {
							TSData.some((el) => el.key == item.key) ? item.isintodo = true : item.isintodo = false;
						});
					}
					else { TSData = [] }
					setValueAll({ SSData, TSData })
				}
			} catch (e) {
				console.error(e);
			}
		};

		fetchData();

	}, [listener]);

	const deleteElement = (key) => {
		setValueAll((prevSavedData) => {

			const newSSDate = prevSavedData.SSData.filter((item) => item.key != key);
			const newTSDate = prevSavedData.TSData.map(item => {
				if (item.key == key) { item.save = false; }
				return item
			});

			saveData({ "SSData": newSSDate, "TSData": newTSDate });
			trigger(Date.now());
			return { "SSData": newSSDate, "TSData": newTSDate };
		});
	};

	const sendToTodo = (key) => {
		setValueAll((prevSavedData) => {
			const newSSDate = prevSavedData.SSData.map((item) => {
				if (item.key == key) {
					item.isintodo = true;
					prevSavedData.TSData.unshift(item);
				};
				return item
			});
			const newTSDate = prevSavedData.TSData;

			console.log("\n🚀 ~ newSSDate ~ 🚀 newSSDate:", newSSDate)
			console.log("\n🚀 ~ newTSDate ~ 🚀 newTSDate:", newTSDate)

			saveData({ "SSData": newSSDate, "TSData": newTSDate });
			trigger(Date.now());
			return { "SSData": newSSDate, "TSData": newTSDate };
		});

	}

	const saveData = async (newSaveAll) => {
		console.log("\n\n🚀 ~ saveData ~ newSaveAll:", JSON.stringify(newSaveAll.SSData), "\n🚀 ~ ", JSON.stringify(newSaveAll.TSData))
		try {
			await AsyncStorage.setItem("saved_todo", JSON.stringify(newSaveAll.SSData));
			await AsyncStorage.setItem("myKey", JSON.stringify(newSaveAll.TSData));
			handleRefreshScreenB();
		} catch (error) {
			alert("Ошибка - " + error);
			console.log(error);
		}
	};

	async function trigger(DateNow) { await AsyncStorage.setItem("trigger", DateNow + ""); }


	clearAll = async () => {
		try {
			trigger(Date.now());
			const newTSDate = valueAll.TSData.map(item => {
				item.save = false;
				return item
			});
			await AsyncStorage.setItem('saved_todo', JSON.stringify([]));
			await AsyncStorage.setItem('myKey', JSON.stringify(newTSDate));

			setValueAll({ "SSData": [], "TSData": [] });
		} catch (e) {
			// clear error
		}
		console.log('clear saved_todo Done.')
	}

	const showConfirm = () => {
		valueAll.SSData.length ? (
			Alert.alert(
				"Confirm",
				"Are you sure you want to do this?",
				[
					{
						text: "Cancel",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel"
					},
					{ text: "OK", onPress: () => clearAll() }
				],
				{ cancelable: true }
			)) : Alert.alert("You don't have any saved To Do.");
	};

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				source={require("../assets/asfalt.png")}
				style={styles.backgroundImage}
				resizeMode="repeat">
				<View>
					<Text style={styles.maintext}>{t("savedtodo")}</Text>
				</View>
				<FlatList style={{ borderBottomWidth: 3, borderColor: "rgba(100,100,100,0.3)" }} data={valueAll.SSData} renderItem={({ item }) => (
					<SavedList element={item} deleteElement={deleteElement} sendToTodo={sendToTodo} />
				)} />
				<SaveAndDellButton title={t("dellall")} onPress={showConfirm} SaveOrDell={0} myStyle={{ color: "#444" }} />
				<View style={{ height: 90}}></View>
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		borderTopWidth: 2,
		borderColor: "rgba(100,100,100,0.3)",
	},
	text: {
		fontSize: 12,
		fontWeight: "500",
	},
	backgroundImage: {
		width: '100%',
		height: '100%',
	},
	maintext: {
		textAlign: "center",
		padding: 5,
		fontSize: 22,
		color: "#553",
		fontWeight: "500",
	},	
});
