import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from 'react-i18next';

const DateItem = ({ item, modalviewdata}) => {
	console.log("🚀 ~ DateItem ~ item:", item)
	
	let st;	let collbDate=item.day.length > 5 ? item.day.slice(0, 5):item.day;
	const { t, i18n } = useTranslation();
	let elements = { "N": "night", "E": "evening", "M": "morning", "🍺": "🍺", "☕️": "☕️" };

	let MondayDay = item.weekDay == t("Monday");
	let Notific = item.Notific;
	// console.log("🚀 ~ DateItem ~ Notific:", Notific);
	return (
		<View style={item.catchToday ? styles.rowToday : styles.row}>
			{/* <Text style={item.catchToday ? styles.dateToday : styles.date}>
				{item.day}
			</Text> */}
			<TouchableOpacity onPress={Notific && (() => modalviewdata(collbDate+"."+item.year))} style={{ flex: 1.8, borderWidth: 0, borderColor: "#89f", justifyContent: "center", flexDirection: "row", ...((item.day.length > 5) && { flex: 2.5, }) }}>
				{Notific && (<View style={{
					// position: "absolute",left: -5, zIndex:1000,
					backgroundColor: "#000", borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderColor: "rgba(250,0,0,1)", justifyContent: "center"
				}}>
					<Text style={{ color: "rgba(255,255,255,1)", fontWeight: "900", fontSize: 12, lineHeight: 13, verticalAlign: "middle", paddingLeft: 4, paddingRight: 4, }}>
						{Notific}
					</Text>
				</View>)}
				<Text style={
					// borderRadius: 5,
					item.catchToday ? { flex: 1, textAlign: "center", textAlignVertical: "center", fontSize: 15, color: "rgba(0,150,0, 1)", fontWeight: "900",backgroundColor: "#fff", ...(!Notific && {  borderTopLeftRadius: 5, borderBottomLeftRadius: 5, })  } : { flex: 1, textAlign: "center", textAlignVertical: "center", fontSize: 15, color: "#000", backgroundColor: "#fff", borderTopLeftRadius: 5, borderBottomLeftRadius: 5, ...(Notific && { ...(item.pastOrNot?({backgroundColor: "rgba(155,255,255,1)"}):({backgroundColor: "rgba(255,175,155,1)"})), borderTopLeftRadius: 0, borderBottomLeftRadius: 0, }) }}>{item.day}</Text>
			</TouchableOpacity>
			

			<View style={(item.weekDay == t("Saturday") || item.weekDay == t("Sunday")) ? styles.textDenNedV : styles.textDenNed}>
				{MondayDay && (<View style={{ position: "absolute", right: 2, top: 2 }}>
					<Text style={{ color: "rgba(250,100,0,1)", fontWeight: "500", fontSize: 14, borderWidth: 0, borderColor: "#090", lineHeight: 14, verticalAlign: "middle", }}>
						{item.weekNum}
					</Text>
				</View>)}
				<View style={MondayDay && { paddingLeft: 2, paddingBottom: 2, alignItems: "flex-start", justifyContent: "flex-end", borderWidth: 0, flex: 1 }}>
					<Text style={{ borderWidth: 0, borderColor: "#f90", lineHeight: 18, verticalAlign: 'bottom', fontSize: 16, textAlign: "center" }}>{item.weekDay}</Text>
				</View>
			</View>

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
	row: {
		position: 'relative',
		flexDirection: 'row',
		margin: 1,
		borderColor: "#ccc",
		paddingHorizontal: 5,
		zIndex: 1,
	},
	rowToday: {
		paddingVertical: 5,
		paddingHorizontal: 5,
		borderRadius: 6,
		flexDirection: 'row',
		marginVertical: 3,
		backgroundColor: "rgba(0,150,0, 1)",
		zIndex: 1,
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
		// textAlign: "center",
		// textAlignVertical: 'center',
		justifyContent: "center",
		// fontSize: 15,
		// fontWeight: "400",
		borderLeftWidth: 1,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
		marginRight: 5,
		color: "#000",
		backgroundColor: "#fff",
		borderColor: "rgba(0,0,0, .05)",
	},
	textDenNedV: {
		flex: 1.0,
		justifyContent: "center",
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
		borderLeftWidth: 1,
		marginRight: 5,
		color: "#000",
		backgroundColor: "#fee",
		borderColor: "rgba(0,0,0, .05)",
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
