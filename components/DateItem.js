import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from 'react-i18next';
import MyTooltip2 from "../components/MyTooltip2";

const DateItem = ({ item }) => {
	
	let st;
	const { t, i18n } = useTranslation();
	let elements={"N":"night","E":"evening","M":"morning","🍺":"🍺","☕️":"☕️"};
	
	return (
		<View style={item.catchToday ? styles.rowToday : styles.row}>
			
			<Text style={item.catchToday ? styles.dateToday : styles.date}>
				{/* {(item.day=="24.06")&&<MyTooltip2 content={"I will preshed)))"}/>} */}
				{item.day}
				</Text>
			<Text style={(item.weekDay == t("Saturday") || item.weekDay == t("Sunday")) ? styles.textDenNedV : styles.textDenNed}>{item.weekDay}</Text>

			{item.shifts.map((element, index) => {
				(element == "🍺" || element == "☕️") ? st = styles.text : st = styles["text" + element];
				return <Text style={st} key={index.toString()}>{t(elements[element])}</Text>
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
	row: {position:'relative', 
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
		flex: 1.7,
		borderColor: "#000",
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: 15,
		borderRadius: br,
		color: "#000",
		backgroundColor: "#fff",
	},
	dateToday: {
		flex: 1.7,
		textAlignVertical: "center",
		textAlign: "center",
		fontSize: 15,
		fontWeight: "900",
		paddingVertical: 3,
		color: "#000",
		borderColor: "#ccc",
	},
	textDenNed: {
		flex: 1.0,
		textAlign: "center",
		textAlignVertical: 'center',
		fontSize: 15,
		fontWeight: "400",
		borderLeftWidth: 2,
		borderRightWidth: 2,
		borderRadius: 5,
		marginHorizontal: 5,
		color: "#000",
		backgroundColor: "#fff",
		borderColor: "#115",
	},
	textDenNedV: {
		flex: 1.0,
		textAlignVertical: 'center',
		textAlign: "center",
		fontSize: 15,
		fontWeight: "900",
		borderLeftWidth: 2,
		borderRightWidth: 2,
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
	textE: {
		color: "#ee0",
		backgroundColor: "#8aF",
		...allcss,
	},
	textM: {
		color: "#b55",
		backgroundColor: "#ffc",
		...allcss,
	},
});

export default React.memo(DateItem);
