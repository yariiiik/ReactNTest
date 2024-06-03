import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DateItem = ({ item }) => {
	let st;
	return (
		<View style={item.catchToday ? styles.rowToday : styles.row}>
			<Text style={item.catchToday ? styles.dateToday : styles.date}>{item.day}</Text>
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
	borderRadius: br,
	borderColor: "#bbb",
	paddingVertical: 2,
	margin: 1,
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		margin: 1,
		borderColor: "#ccc",
		paddingHorizontal: 5,
	},
	rowToday: {
		paddingVertical: 5,
		paddingHorizontal: 5,
		borderRadius: 6,
		flexDirection: 'row',
		marginVertical: 3,
		backgroundColor: "#f88",
	},
	date: {
		flex: 1.8,
		borderColor: "#000",
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: 15,
		borderRadius: br,
		color: "#000",
		backgroundColor: "#fff",
	},
	dateToday: {
		flex: 1.8,
		textAlignVertical: "center",
		textAlign: "center",
		fontSize: 15,
		fontWeight: "900",
		paddingVertical: 3,
		color: "#000",
		borderColor: "#ccc",
	},
	textDenNed: {
		flex: 1.2,
		textAlign: "center",
		textAlignVertical: 'center',
		fontSize: 15,
		fontWeight: "400",
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderRadius: 5,
		marginHorizontal: 5,
		color: "#000",
		backgroundColor: "#fff",
		borderColor: "#115",
	},
	textDenNedV: {
		flex: 1.2,
		textAlignVertical: 'center',
		textAlign: "center",
		fontSize: 15,
		fontWeight: "900",
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderRadius: 5,
		marginHorizontal: 5,
		color: "#000",
		backgroundColor: "#fee",
		borderColor: "#115",
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
