import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions, ScrollView } from "react-native";


export default function SettingsScreen() {
	let smeni_names = ["🍌", "🍑", "🍓", "🍒"];
	let shifts = [0, 14, 7, 21];
	let dninedeli = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

	// const screenHeight = Dimensions.get('window').height;
	// console.log("🚀 ~ SettingsScreen ~ screenHeight:", screenHeight);

	let graf_shifts = ["N", "N", "N", "N", "N", "N", "🍺", "O", "O", "O", "O", "🍺", "R", "R", "R", "🍺", "🍺", "🍺", "O", "O", "O", "🍺", "R", "R", "R", "R", "🍺", "☕️"];
	// let graf_shifts = ["N", "N", "N", "N", "N", "N", " ", "O", "O", "O", "O", " ", "R", "R", "R", " ", " ", " ", "O", "O", "O", " ", "R", "R", "R", "R", " ", " "];


	const [savedMonth, setSavedMonth] = useState(0);

	let getUserDate = () => {
		let today = new Date();
		today.setMonth(today.getMonth() + savedMonth);
		let todayFullYear = today.getFullYear();
		let todayMonth = today.getMonth() + 1;

		let startD = new Date(`${todayFullYear}-${todayMonth}-1`);
		let lastDay = new Date(todayFullYear, todayMonth, 0);

		let endD = new Date(`${todayFullYear}-${todayMonth}-${lastDay.getDate()}`);
		let startDayOfYear = Math.round((startD - new Date(2024, 0, 1)) / (24 * 60 * 60 * 1000));
		return { startD, endD, startDayOfYear }
	}

	let createMassDate = (print_shift) => {
		const today = new Date();
		const todayDay = today.getDate();
		const todayMonth = today.getMonth();
		let UserDate = getUserDate();
		let day, month, currentshift, dennedeli, dateText;
		let massDate = [];
		while (UserDate.startD <= UserDate.endD) {
			day = UserDate.startD.getDate();
			month = UserDate.endD.getMonth() + 1;

			dateText = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}`;
			dennedeli = dninedeli.at(UserDate.startDayOfYear % 7);

			currentshift = graf_shifts.at((UserDate.startDayOfYear + print_shift) % graf_shifts.length);


			massDate.push([<CellDate _={todayDay == day && (todayMonth + 1) == month} T={dateText} />, <Denned dn={dennedeli} />, <Yachejka el={currentshift} />]);

			UserDate.startDayOfYear++;
			UserDate.startD.setDate(UserDate.startD.getDate() + 1);
		}
		return massDate;
	};

	const CellDate = ({ _, T }) => {
		return (<Text style={_ ? styles.dateToday : styles.date}>{T}</Text>)
	};
	const Yachejka = ({ el }) => {
		if (el == "N") { return (<Text style={styles.textN}>{el}</Text>) }
		if (el == "O") { return (<Text style={styles.textO}>{el}</Text>) }
		if (el == "R") { return (<Text style={styles.textR}>{el}</Text>) }

		return (<Text style={styles.text}>{el}</Text>)
	};
	const Denned = ({ dn }) => {
		if (dn == "Сб" || dn == "Вс") { return (<Text style={styles.textDenNedV}>{dn}</Text>) }

		return (<Text style={styles.textDenNed}>{dn}</Text>)
	};


	return (
		<SafeAreaView style={{ borderWidth: 0, borderColor: "#090", padding: 3, height: "100%" }}>
			<ScrollView>
				<View style={styles.container}>
					<View style={{ borderWidth: 1, width: "40%", }}>
						{createMassDate(shifts[1]).map((element, index) => (
							<View key={index} style={styles.view1}>
								{/* <View style={styles.view2}> */}
								{element[0]}{element[1]}
								{/* </View> */}
								{element[2]}
							</View>
						))}
					</View>

					<View style={styles.shift}>
						<Text>buttons</Text>
					</View>

				</View>
			</ScrollView>
			<View style={{ height: 90, borderWidth: 0, borderColor: "#900", backgroundColor: "#eea" }}></View>
		</SafeAreaView>
	);
}

const fS = 14;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "space-evenly",
		// alignItems: "stretch",
		flexDirection: "row",
		flexWrap: "wrap",
		textAlign: "center",
		paddingBottom: 10,
		paddingTop: 10,
		paddingLeft: 10,
		borderWidth: 1,
	},
	view1: {
		flexDirection: 'row',
		// overflow: "hidden",
		// height: 40
	},
	// view2: {
	// 	flexDirection: "row",
	// 	width: "70%"
	// },
	date: {
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: fS,
		fontWeight: "900",

		borderWidth: 1,
		borderRadius: 5,
		margin: 1,
		color: "#000",
		backgroundColor: "#fff",
		borderColor: "#ccc",
		paddingHorizontal: 8,
	},
	dateToday: {
		textAlign: "center",
		fontSize: 18,
		fontWeight: "900",
		paddingVertical: 3,

		borderWidth: 1,
		borderRadius: 5,
		margin: 1,
		color: "#000",
		backgroundColor: "#f99",
		borderColor: "#ccc",
		paddingHorizontal: 8,
	},
	textDenNed: {
		flexGrow: 1,
		textAlign: "center",
		textAlignVertical: 'center',
		fontSize: fS,
		fontWeight: "900",

		borderWidth: 1,
		borderRadius: 5,
		margin: 1,
		color: "#000",
		backgroundColor: "#fff",
		borderColor: "#ccc",
		paddingHorizontal: 8,
	},
	textDenNedV: {
		flexGrow: 1,
		textAlignVertical: 'center',
		textAlign: "center",
		fontSize: fS,
		fontWeight: "900",

		borderWidth: 1,
		borderRadius: 5,
		margin: 1,
		color: "#400",
		backgroundColor: "#fee",
		borderColor: "#ccc",
		paddingHorizontal: 8,
	},
	shift: {
		width: "15%",
		// height: "100%",
		borderWidth: 1,
	},
	text: {
		textAlign: "center",
		textAlignVertical: 'center',
		fontSize: fS,
		fontWeight: "900",
		paddingVertical: 1,

		borderWidth: 1,
		borderRadius: 5,
		margin: 1,
		color: "#000",
		backgroundColor: "#fff",
		borderColor: "#ccc",
		paddingHorizontal: 3,

		// aspectRatio: 1,
		// alignSelf:"center",
	},
	textN: {
		textAlign: "center",
		textAlignVertical: 'center',
		fontSize: fS,
		fontWeight: "900",

		borderWidth: 1,
		borderRadius: 5,
		margin: 1,
		color: "#FFFFFF",
		backgroundColor: "#000",
		borderColor: "#ccc",
		paddingHorizontal: 8,

		// aspectRatio: 1,
		// alignSelf:"center",
	},

	textO: {
		textAlign: "center",
		textAlignVertical: 'center',
		fontSize: fS,
		fontWeight: "900",

		borderWidth: 1,
		borderRadius: 5,
		margin: 1,
		color: "#ee0",
		backgroundColor: "#58F",
		borderColor: "#ccc",
		paddingHorizontal: 8,

		// aspectRatio: 1,
		// alignSelf:"center",
	},
	textR: {
		textAlign: "center",
		textAlignVertical: 'center',
		fontSize: fS,
		fontWeight: "900",

		borderWidth: 1,
		borderRadius: 5,
		margin: 1,
		color: "#c22",
		backgroundColor: "#ffc",
		borderColor: "#aaa",
		paddingHorizontal: 8,

		// aspectRatio: 1,
		// alignSelf:"center",
	},
});
