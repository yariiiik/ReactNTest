import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useTranslation } from 'react-i18next';
import { Ionicons, Feather } from "@expo/vector-icons";

const DateItem = ({ item, modalviewdata, settings }) => {
	console.log("🚀 ~ DateItem ~ settings:", settings)
	let Imgg = () => (<View style={{ justifyContent: "center" }}><Image style={{ width: 30, height: 30, }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7682/7682582.png' }} /></View>);
	// https://cdn-icons-png.flaticon.com/512/7682/7682582.png
	// https://cdn-icons-png.flaticon.com/512/7682/7682451.png
	// https://cdn-icons-png.flaticon.com/512/7682/7682691.png
	// https://cdn-icons-png.flaticon.com/512/7682/7682552.png
	// https://cdn-icons-png.flaticon.com/512/7682/7682324.png
	// https://www.shutterstock.com/image-vector/day-off-vector-hand-drawn-260nw-1038793531.jpg
	// https://img.freepik.com/premium-vector/day-off-set-grunge-rubber-stamp_545399-2180.jpg
	
	let st; let collbDate = item.day.length > 5 ? item.day.slice(0, 5) : item.day;
	const { t, i18n } = useTranslation();
	let elements = { "N": "night", "E": "evening", "M": "morning", "🍺": "🍺", "☕️": "☕️"};//, "🍺": "🍺", "☕️": "☕️"


	let MondayDay = item.weekDay == t("Monday");
	let Notific = settings.notific&&item.Notific;
	let colorsch = settings.colorscheme?"G":"";
	// console.log("🚀 ~ DateItem ~ Notific:", Notific);
	return (
		<View style={item.catchToday ? [styles.rowToday,{backgroundColor:colorsch?"rgba(50,50,50, 1)":"rgba(0,150,0, 1)"}] : styles.row}>
			<TouchableOpacity onPress={Notific ? (() => modalviewdata(collbDate + "." + item.year)) : (() => modalviewdata(collbDate + "." + item.year))} style={{ flex: 1.9, borderWidth: 0, borderColor: "#89f", justifyContent: "center", flexDirection: "row", ...((item.day.length > 5) && { flex: 2.6, }) }}>
				{Notific && (<View style={styles.notificCont}>
					<Text style={styles.notificText}>
						{Notific}
					</Text>
				</View>)}
				<Text style={{backgroundColor: "#fff",flex: 1, textAlign: "center", textAlignVertical: "center",fontSize: 18, paddingVertical: 5, borderTopLeftRadius: 5, borderBottomLeftRadius: 5,	
				...(item.catchToday?{color:  colorsch?"rgba(50,50,50, 1)":"rgba(0,150,0, 1)", fontWeight: "900",}:{color: "#000"}),
				...(Notific && { borderTopLeftRadius: 0, borderBottomLeftRadius: 0,
					...(item.pastOrNot ? { backgroundColor: colorsch?"rgba(240,240,240,1)":"rgba(200,255,255,1)" } : { backgroundColor: colorsch?"rgba(190,190,190,1)":"rgba(255,210,180,1)" })}
				)}}>{item.day}</Text>
			</TouchableOpacity>

			<View style={(item.weekDay == t("Saturday") || item.weekDay == t("Sunday")) ? [styles.textDenNedV,{backgroundColor:colorsch?"#e9e9e9":"#fff3ee"}] : styles.textDenNed}>
				{(MondayDay&&settings.weeknum) && (<View style={{ position: "absolute", right: 2, top: 2 }}>
					<Text style={{ color: colorsch?"rgba(150,150,150,1)":"rgba(250,100,0,1)", fontWeight: "500", fontSize: 15, borderWidth: 0, borderColor: "#090", lineHeight: 15, verticalAlign: "middle", }}>
						{item.weekNum}
					</Text>
				</View>)}
				<View style={(MondayDay&&settings.weeknum) && {alignItems: "center", justifyContent: "flex-end", borderWidth: 0, flex: 1 }}>
					<Text style={{ borderWidth: 0, borderColor: "#f90", verticalAlign: 'bottom', fontSize: 18, textAlign: "center" }}>{item.weekDay}</Text>
				</View>
			</View>

			{item.shifts.map((element, index) => {
				let elemItem; //Imgg(), element
				let nameIcon;
				if (settings.dayofficon) {
					if(colorsch){nameIcon = (element == "🍺") ? <Ionicons name="beer-outline" size={25} color="#999" />:<Feather name="coffee" size={22} color="#999" />}
					else nameIcon=elements[element]
				} else {nameIcon=" "}

				(element == "🍺" || element == "☕️") ? (st = styles.text, elemItem = nameIcon) : (st = styles["text" + element+colorsch], elemItem = t(elements[element]));
				
				return <Text style={[st, (index == 0 && { borderTopLeftRadius: 5, borderBottomLeftRadius: 5, }), ((index == (item.shifts.length - 1)) && { borderTopRightRadius: 5, borderBottomRightRadius: 5, }), (index > 0 && { borderLeftWidth: 0, borderColor: "rgba(0,0,0, .3)", })]} key={index.toString()}>{elemItem}</Text>
			})}
		</View>
	);
}

// let br = 5;
let allcss = {
	flex: 1,
	textAlign: "center",
	textAlignVertical: 'center',
	fontSize: 20,
	fontWeight: "700",
	// borderRadius: br, 
	borderColor: "#bbb",
	// paddingVertical: 2,
	marginRight: 1,
	marginLeft: 1,
};

const styles = StyleSheet.create({
	notificCont: {
		backgroundColor: "#000",
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
		// borderColor: "rgba(250,0,0,1)",
		justifyContent: "center"
	},
	notificText: {
		color: "rgba(255,255,255,1)",
		fontWeight: "900",
		fontSize: 15,
		// lineHeight: 13,
		verticalAlign: "middle",
		paddingLeft: 4,
		paddingRight: 4,
	},
	row: {
		position: 'relative',
		flexDirection: 'row',
		margin: 1,
		borderWidth: 0,
		borderColor: "#333",
		paddingHorizontal: 5,
		zIndex: 1,
	},
	rowToday: {
		paddingVertical: 5,
		paddingHorizontal: 5,
		borderRadius: 6,
		flexDirection: 'row',
		marginVertical: 3,
		// backgroundColor: "rgba(0,150,0, 1)",
		zIndex: 1,
	},
	date: {
		flex: 1.7,
		borderColor: "#000",
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: 15,
		borderRadius: 5,
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
		backgroundColor: "#fff3ee",
		borderColor: "rgba(0,0,0, .05)",
	},
	text: {
		color: "#333",
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
	textNG: {
		color: "#000",
		backgroundColor: "#999",
		...allcss,
	},
	textEG: {
		color: "#000",
		backgroundColor: "#bbb",
		...allcss,
	},
	textMG: {
		color: "#000",
		backgroundColor: "#eee",
		...allcss,
	},
});

export default React.memo(DateItem);
