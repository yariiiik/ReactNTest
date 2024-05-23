import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DateItem = ({ item }) => {
	// Функция для получения сегодняшней даты
	const getTodayDate = () => {
		const today = new Date();
		let todayDay = today.getDate();
		todayDay < 10 && (todayDay = '0' + todayDay)
		let todayMonth = today.getMonth() + 1;
		todayMonth < 10 && (todayMonth = '0' + todayMonth)
		return { todayDay, todayMonth };
	}

	console.log("🚀 ~ DateItem ~ item:", item)
	const { todayDay, todayMonth } = getTodayDate();

	let catchToday = item.day === `${todayDay}.${todayMonth}`;
	let st;
	return (
		<View style={catchToday ? styles.rowToday : styles.row}>
			<Text style={catchToday ? styles.dateToday : styles.date}>{item.day}</Text>
			<Text style={(item.weekDay == "Сб" || item.weekDay == "Вс") ? styles.textDenNedV : styles.textDenNed}>{item.weekDay}</Text>

			{item.shifts.map((element, index) => {
				(element == "🍺" || element == "☕️") ? st = styles.text : st = styles["text" + element];
				return <Text style={st} key={index.toString()}>{element}</Text>
			})}
		</View>
	);
}

let br = 5;
let allcss = {
	flex: 1,
	textAlign: "center",
	textAlignVertical: 'center',
	fontSize: 18,
	fontWeight: "700",
	// borderLeftWidth: 1,
	// borderRightWidth: 1,
	// borderWidth: 1,
	borderRadius: br,
	borderColor: "#bbb",
	paddingVertical: 2,
	margin: 1,
	// paddingHorizontal: 8,
	// aspectRatio: 1 / 1,
};

const styles = StyleSheet.create({
	row: {
		// borderRadius: 5,
		// borderBottomWidth: 1,
		// overflow: "hidden",
		// display: 'flex',
		flexDirection: 'row',
		margin: 1,
		borderColor: "#ccc",
		// backgroundColor: "#999",
		paddingHorizontal: 5,

	},
	rowToday: {
		paddingVertical: 5,
		paddingHorizontal: 5,
		borderRadius: 6,
		// borderTopWidth: 3,
		// borderBottomWidth: 3,
		flexDirection: 'row',
		marginVertical: 3,
		// borderColor: "#e77",
		backgroundColor: "#f88",
		// justifyContent: "space-between"
	},
	date: {
		flex: 1.8,
		// borderRightWidth:1,
		borderColor: "#000",
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: 15,
		// fontWeight: "900",
		// borderWidth: 1,
		borderRadius: br,
		// margin: 1,
		color: "#000",
		backgroundColor: "#fff",
		// borderColor: "#ccc",
		// paddingHorizontal: 8,
		// paddingVertical: 2
	},
	dateToday: {
		flex: 1.8,
		textAlignVertical: "center",
		textAlign: "center",
		fontSize: 15,
		fontWeight: "900",
		paddingVertical: 3,
		// borderWidth: 1,
		// borderRadius: 5,
		// margin: 1,
		color: "#000",
		// backgroundColor: "#fff",
		borderColor: "#ccc",
		// paddingHorizontal: 8,
	},
	textDenNed: {
		flex: 1.2,
		textAlign: "center",
		textAlignVertical: 'center',
		fontSize: 15,
		fontWeight: "400",
		// paddingHorizontal: 8,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderRadius: 5,
		// margin: 1,
		marginHorizontal: 5,
		color: "#000",
		backgroundColor: "#fff",
		borderColor: "#115",
		// aspectRatio: 1 / 1,
	},
	textDenNedV: {
		flex: 1.2,
		textAlignVertical: 'center',
		textAlign: "center",
		fontSize: 15,
		fontWeight: "900",
		// paddingHorizontal: 8,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderRadius: 5,
		// margin: 1,
		marginHorizontal: 5,
		color: "#000",
		backgroundColor: "#fee",
		borderColor: "#115",
		// aspectRatio: 1 / 1,
	},
	text: {
		color: "#ddd",
		backgroundColor: "#fff",
		...allcss,
	},
	textN: {
		color: "#FFFFFF",
		backgroundColor: "#888",
		...allcss,
	},
	textO: {
		color: "#ee0",
		backgroundColor: "#8aF",
		...allcss,
	},
	textR: {
		color: "#b55",
		backgroundColor: "#ffc",
		...allcss,
	},
});

export default React.memo(DateItem);
