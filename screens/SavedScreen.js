import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ImageBackground, Dimensions, FlatList} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import List from "../components/List";


const { width, height } = Dimensions.get('window');

export default function SavedScreen() {
	let [value, setValue] = useState(null);

	useEffect(() => {
		AsyncStorage.getItem("saved_todo")
			.then((value) => {
				if (value !== null) {
					setValue(JSON.parse(value));
				}
			})
			.catch((error) => console.log(error));
	});

	const getData = async () => {
		try {
			const value = await AsyncStorage.getItem('saved_todo');
			// const value = await AsyncStorage.multiGet(['myKey', 'saved_todo']);
			if (value !== null) {
				setValue(JSON.parse(value));
			}
			else { setValue('') }
			console.log("🚀 ~ getData ~ JSON.stringify(value, null, 2):", JSON.parse(value))
		} catch (e) {
			// error reading value
		}
	};

	clearAll = async () => {
		try {
			await AsyncStorage.setItem('saved_todo', JSON.stringify([]));
			setValue(null);
		} catch (e) {
			// clear error
		}
		console.log('clear saved_todo Done.')
	}

	const saveData = async () => {
		try {
			let saveobj = [{
				text: "первое сохраненное напоминание)",
				key: "" + Date.now(),
				checked: false,
			}];
			await AsyncStorage.setItem('saved_todo', JSON.stringify(saveobj));
		} catch (e) {
			// saving error
		}
	};

	return (
		<View style={styles.backgroundWrapper}>
			<ImageBackground
				source={require("../assets/asfalt--dark.png")}
				style={styles.backgroundImage}
				resizeMode="repeat">



				<View style={styles.container}>
					<View>
						<Text>"saved data"</Text>
						<Text></Text>
						<Button onPress={getData} title="get Data" />
					</View>

					<FlatList
						data={value}
						renderItem={({ item }) => (
							<List
								element={item}
								// deleteElement={deleteElement}
								// toggleCheckbox={toggleCheckbox}
								// saveTodo={saveTodo}
							/>
						)}
					/>
					<Button onPress={saveData} title="save data" />
					<Button onPress={clearAll} title="clearAll" />
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	text: {
		fontSize: 12,
		fontWeight: "500",
		// fontFamily: "",
	},
	backgroundWrapper: {
		position: 'absolute',
		width: width,
		height: height,
	},
	backgroundImage: {
		width: '100%',
		height: '100%',
	},
});
