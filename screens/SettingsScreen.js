import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions, ScrollView, FlatList, Pressable, Modal, Alert, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ModalComponent } from "./ModalComponent";

const { width, height } = Dimensions.get('window'); // Получаем размеры экрана


export default function SettingsScreen() {
	// Инициализируем массивы для имен смен и их смещений
	let smeni_names = ["🍌", "🍑", "🍓", "🍒"];
	let shifts = [0, 14, 7, 21];
	let dninedeli = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
	console.log("🚀 ~ createMassDate ~ UserDate:", smeni_names)
	// Инициализируем массив с графиком смен
	let graf_shifts = ["N", "N", "N", "N", "N", "N", "🍺", "O", "O", "O", "O", "🍺", "R", "R", "R", "🍺", "🍺", "🍺", "O", "O", "O", "🍺", "R", "R", "R", "R", "🍺", "☕️"];

	// Инициализируем состояние для сохраненного месяца и видимости модального окна
	const [savedWMYcount, setSavedWMYcount] = useState({ WMY: "month", count: 0 });
	const [modalVisible, setModalVisible] = useState(false);

	// Функция для получения даты пользователя
	let getUserDate = () => {
		let UD = new Date();
		let UDStart; let UDEnd;

		if (savedWMYcount.WMY == "month") {
			UD.setMonth(UD.getMonth() + savedWMYcount.count);
			UDStart = new Date(UD.getFullYear(), UD.getMonth(), 1);
			UDEnd = new Date(UDStart.getFullYear(), UDStart.getMonth() + 1, 0);

		}
		if (savedWMYcount.WMY == "week") {
			UD.setDate(UD.getDate() - 6 + (savedWMYcount.count * 7));
			UDStart = new Date(UD);	// = new Date(UD.getFullYear(), UD.getMonth(), UD.getDate())
			UDEnd = new Date(UDStart.getFullYear(), UDStart.getMonth(), UDStart.getDate() + 7);
		}
		if (savedWMYcount.WMY == "year") {
			UD.setFullYear(UD.getFullYear() + savedWMYcount.count);
			UDStart = new Date(UD.getFullYear(), 0, 1);
			UDEnd = new Date(UDStart.getFullYear(), 11, 31);
		}

		let UDStartDayOfYear = Math.round((UDStart - new Date(UD.getFullYear(), 0, 1)) / (24 * 60 * 60 * 1000));
		return { UDStart, UDEnd, UDStartDayOfYear }
	}
	// Функция для создания массива дат 
	let createMassDate = useMemo(() => {
		let UserDate = getUserDate();
		console.log("🚀 ~ createMassDate ~ UserDate:", UserDate)
		let day, month, weekDay, dateText;
		let massObjData = [];
		while (UserDate.UDStart <= UserDate.UDEnd) {
			let currentshifts = [];
			day = UserDate.UDStart.getDate();
			month = UserDate.UDStart.getMonth() + 1;

			dateText = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}${savedWMYcount.WMY == "year" ? "." + UserDate.UDStart.getFullYear() : ""}`;
			weekDay = dninedeli.at(UserDate.UDStartDayOfYear % 7);

			shifts.forEach(element => {
				currentshifts.push(graf_shifts[(UserDate.UDStartDayOfYear + element) % graf_shifts.length])
			});

			massObjData.push({ day: dateText, weekDay, shifts: currentshifts });

			UserDate.UDStartDayOfYear++;
			UserDate.UDStart.setDate(UserDate.UDStart.getDate() + 1);
		}
		return massObjData;
	}, [savedWMYcount]);

	// Функция для получения сегодняшней даты
	const getTodayDate = () => {
		const today = new Date();
		let todayDay = today.getDate();
		todayDay < 10 && (todayDay = '0' + todayDay)
		let todayMonth = today.getMonth() + 1;
		todayMonth < 10 && (todayMonth = '0' + todayMonth)
		return { todayDay, todayMonth };
	}
	

	// Компонент для отображения дат дня недели и смен
	const DateItem = React.memo(({ item }) => {
		console.log("🚀 ~ DateItem ~ item:", item)
		const { todayDay, todayMonth } = getTodayDate();
		let catchToday = item.day === `${todayDay}.${todayMonth}`;
		return (
			<View style={catchToday ? styles.rowToday : styles.row}>
				<CellDate today={catchToday} T={item.day} />
				<WeekDay dn={item.weekDay} />
				{item.shifts.map((element, index) => (
					<Yachejka el={element} key={index.toString()} />
				))}
			</View>
		);
	});
	
	// Компонент для отображения даты
	const CellDate = ({ today, T }) => {
		return (<Text style={today ? styles.dateToday : styles.date}>{T}</Text>)
	};
	// Компонент для отображения дня недели
	const WeekDay = ({ dn }) => {
		if (dn == "Сб" || dn == "Вс") { return (<Text style={styles.textDenNedV}>{dn}</Text>) }
		return (<Text style={styles.textDenNed}>{dn}</Text>)
	};
	// Компонент для отображения смен
	const Yachejka = ({ el }) => {
		if (el == "N") { return (<Text style={styles.textN}>{el}</Text>) }
		if (el == "O") { return (<Text style={styles.textO}>{el}</Text>) }
		if (el == "R") { return (<Text style={styles.textR}>{el}</Text>) }

		return (<Text style={styles.text}>{el}</Text>)
	};

	return (
		<SafeAreaView style={{ borderWidth: 0, borderColor: "#090", padding: 0, height: "100%", backgroundColor: "#eee", }}>
			<View style={styles.backgroundWrapper}>
				<ImageBackground
					source={require("../assets/asfalt-dark.png")}
					style={styles.backgroundImage}
					resizeMode="repeat"
				>

					<View style={styles.container}>
						<View style={styles.settings}>
							<Pressable
								// style={[styles.button, styles.buttonOpen]}
								onPress={() => setModalVisible(true)}>
								<Ionicons
									name={modalVisible ? 'settings' : 'settings-outline'}
									size={46}
									color="#464"
								// onPress={() => setModalVisible(true)}
								/>
							</Pressable>
						</View>
						<View style={styles.shifts}>
							<View style={{ maxHeight: "100%" }}>
								<View style={styles.headrow}>
									<Text style={styles.headD}>Date</Text>
									<Text style={styles.headW}>Week</Text>
									<Text style={styles.headS}>🍑</Text>
									<Text style={styles.headS}>🍌</Text>
									<Text style={styles.headS}>🍓</Text>
									<Text style={styles.headS}>🍒</Text>
								</View>
								<FlatList
									data={createMassDate}
									renderItem={({ item }) => <DateItem item={item} />}
									keyExtractor={(item, index) => index.toString()}
								// removeClippedSubviews={false}
								/>
							</View>
						</View>
					</View>

					<View style={{
						height: 110,
						borderWidth: 0,
						borderColor: "#900",
						// backgroundColor: "#eea" 
					}}></View>

					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => {
							Alert.alert('Modal has been closed.');
							setModalVisible(!modalVisible);
						}}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>

								<View style={{ flexDirection: "row" }}>
									<Pressable onPress={() => setSavedWMYcount(current => {
										return { WMY: "week", count: 0 }
									})}
										style={({ pressed }) => ({ backgroundColor: pressed ? 'rgb(100, 230, 0)' : 'white' })}>
										<Text style={{ textAlign: 'center', borderWidth: 1, padding: 10, margin: 10 }}>Week</Text>
									</Pressable>
									<Pressable onPress={() => setSavedWMYcount(current => {
										return { WMY: "month", count: 0 }
									})}
										style={({ pressed }) => ({ backgroundColor: pressed ? 'rgb(100, 230, 100)' : 'white' })}>
										<Text style={{ textAlign: 'center', borderWidth: 1, padding: 10, margin: 10 }}>Month</Text>
									</Pressable>
									<Pressable onPress={() => setSavedWMYcount(current => {
										return { WMY: "year", count: 0 }
									})}
										style={({ pressed }) => ({ backgroundColor: pressed ? 'rgb(100, 230, 150)' : 'white' })}>
										<Text style={{ textAlign: 'center', borderWidth: 1, padding: 10, margin: 10 }}>Year</Text>
									</Pressable>
								</View>


								<Pressable
									style={[styles.button, styles.buttonClose]}
									onPress={() => setModalVisible(!modalVisible)}>
									<Text style={styles.textStyle}>Hide Modal</Text>
								</Pressable>
								<View style={{ flexDirection: "row" }}>
									<Pressable onPress={() => setSavedWMYcount(current => {
										return { WMY: current.WMY, count: current.count - 1 }
									})}
										style={({ pressed }) => ({ backgroundColor: pressed ? 'rgb(20, 230, 255)' : 'white' })}>
										{({ pressed }) => (
											<Text style={{ textAlign: 'center', borderWidth: 1, padding: 10, margin: 10 }}>{pressed ? 'Pressed!' : ' - '}</Text>
										)}
									</Pressable>
									<Pressable onPress={() => setSavedWMYcount(current => {
										return { WMY: current.WMY, count: 0 }
									})}
										style={({ pressed }) => ({ backgroundColor: pressed ? 'rgb(220, 130, 95)' : 'white' })}>
										<Text style={{ textAlign: 'center', borderWidth: 1, padding: 10, margin: 10 }}>Х</Text>

									</Pressable>
									<Pressable onPress={() => setSavedWMYcount(current => {
										return { WMY: current.WMY, count: current.count + 1 }
									})}
										style={({ pressed }) => ({ backgroundColor: pressed ? 'rgb(20, 230, 255)' : 'white' })}>
										{({ pressed }) => (
											<Text style={{ textAlign: 'center', borderWidth: 1, padding: 10, margin: 10 }}>{pressed ? 'Pressed!' : ' + '}</Text>
										)}
									</Pressable>
								</View>
							</View>
						</View>
					</Modal>
				</ImageBackground>
			</View>
		</SafeAreaView >
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
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "stretch",

		textAlign: "center",
		// paddingBottom: 5,
		// paddingTop: 5,
		paddingLeft: 3,
		paddingRight: 3,
		// borderWidth: 1,
		// backgroundColor: "#ffe",
	},
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
	headrow: {
		paddingRight: 5,
		paddingLeft: 3,
		borderBottomWidth: 2,
		borderColor: "#000",
		flexDirection: 'row',
	},
	headD: { flex: 1.8, borderRightWidth: 0, borderColor: "#000", margin: 1, fontSize: 15, fontWeight: "900", textAlign: "center", textAlignVertical: "center", },
	headW: { flex: 1.2, margin: 1, marginHorizontal: 5, fontWeight: "900", textAlignVertical: 'center', textAlign: "center", },
	headS: {
		flex: 1, textAlign: "center", textAlignVertical: 'center',
		fontSize: 18,
		fontWeight: "700",
		// borderLeftWidth: 1,
		// borderRightWidth: 1,
		paddingVertical: 2,
		marginRight: 1,
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
	settings: {
		// borderWidth: 1, 
		flex: 0,
		width: "auto",
		padding: 5,
		// flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	shifts: {
		// width: "auto",
		// flexGrow: 0.8,
		// borderWidth: 1,
		// marginLeft: 5, borderColor: "#11f",
		justifyContent: "center",
		// alignItems: "center",

		flex: 1,
		// height: "100%",
		// margin: 1,
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

	centeredView: {
		flex: 1,
		// borderWidth: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: "100%",

	},
	modalView: {
		// margin: 20,
		justifyContent: 'center',
		alignItems: 'center',
		height: "50%",
		width: "80%",
		backgroundColor: 'white',
		borderRadius: 20,
		// padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.95,
		shadowRadius: 5,
		elevation: 20,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 10,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},

	backgroundWrapper: {
		position: 'absolute',
		width: width,
		height: height + 20,
	},
	backgroundImage: {
		width: '100%',
		height: '100%', borderWidth: 0,
	},
});
