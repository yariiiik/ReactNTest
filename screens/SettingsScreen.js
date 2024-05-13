import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions, FlatList } from "react-native";


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
		let day, month, dennedeli, dateText;
		let massObjData = [];
		while (UserDate.startD <= UserDate.endD) {
			let currentshifts = [];
			day = UserDate.startD.getDate();
			month = UserDate.endD.getMonth() + 1;

			dateText = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}`;
			dennedeli = dninedeli.at(UserDate.startDayOfYear % 7);

			print_shift.forEach(element => {
				currentshifts.push(graf_shifts[(UserDate.startDayOfYear + element) % graf_shifts.length])
			});
			// massObjData.push([<CellDate _={todayDay == day && (todayMonth + 1) == month} T={dateText} />, <Denned dn={dennedeli} />, <Yachejka el={currentshift} />]);
			massObjData.push({ day: dateText, weekDay: dennedeli, shifts: currentshifts });

			UserDate.startDayOfYear++;
			UserDate.startD.setDate(UserDate.startD.getDate() + 1);
		}
		return massObjData;
	};
	// console.log("🚀 ~ createMassDate ~ massObjData:", createMassDate([14,0]))

	const getTodayDate = () => {
		const today = new Date();
		const todayDay = today.getDate();
		const todayMonth = today.getMonth() + 1;
		return { todayDay, todayMonth };
	}
	const { todayDay, todayMonth } = getTodayDate();

	const renderItem = ({ item }) => {

		return (
			<View style={styles.row}>
				<CellDate today={item.day === `${todayDay}.${todayMonth}`} T={item.day} />
				<WeekDay dn={item.weekDay} />
				{item.shifts.map((element) => (
					<Yachejka el={element} />
				))}
			</View>
		)
	}




	const CellDate = ({ today, T }) => {
		return (<Text style={today ? styles.dateToday : styles.date}>{T}</Text>)
	};
	const WeekDay = ({ dn }) => {
		if (dn == "Сб" || dn == "Вс") { return (<Text style={styles.textDenNedV}>{dn}</Text>) }
		return (<Text style={styles.textDenNed}>{dn}</Text>)
	};
	const Yachejka = ({ el }) => {
		if (el == "N") { return (<Text style={styles.textN}>{el}</Text>) }
		if (el == "O") { return (<Text style={styles.textO}>{el}</Text>) }
		if (el == "R") { return (<Text style={styles.textR}>{el}</Text>) }

		return (<Text style={styles.text}>{el}</Text>)
	};



	return (
		<SafeAreaView style={{ borderWidth: 0, borderColor: "#090", padding: 0, height: "100%" }}>
			<View style={styles.container}>
				<View style={{ borderWidth: 1, width: "80%", }}>
					<FlatList
						data={createMassDate([shifts[1],shifts[0],shifts[2],shifts[3]])}
						renderItem={renderItem}
						keyExtractor={(item, index) => index.toString()}
						contentContainerStyle={{ paddingVertical: 5 }}
					/>
				</View>

				<View style={styles.shift}>
					<Text>buttons</Text>
				</View>
			</View>
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
		// flexWrap: "wrap",
		// textAlign: "center",
		paddingBottom: 3,
		paddingTop: 10,
		paddingLeft: 10,
		borderWidth: 0,
		borderColor: "#0f0",
		// width: "50%",
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 3,
	},
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
