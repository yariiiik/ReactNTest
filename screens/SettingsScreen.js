import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, SafeAreaView } from "react-native";
import Dropdown from '../components/Dropdown';
import CustomTooltip from '../components/CustomTooltip';
import CustomModalTooltip from '../components/CustomModalTooltip';
import { useTranslation } from 'react-i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyTooltip from "../components/MyTooltip";
import MyTooltip2 from "../components/MyTooltip2";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

export default function SettingsScreen({ route, navigation }) {
	// const navigation = useNavigation();
	const navigation2 = useNavigation();

	
	const { t, i18n } = useTranslation();

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
		AsyncStorage.setItem("language", lng);
		console.log("🚀 ~ changeLanguage ~ resolvedLanguage :", i18n.resolvedLanguage);
	};

	const changeTheme = (the) => {
		console.log("🚀 ~ changeTheme ~ changeTheme :", the);
		console.log("🚀 ~ SettingsScreen ~ route:", navigation2.setParams({ user2: '100' }))
	};

	const changeGraf = (gra, label) => {
		navigation.setParams({ grafType: gra });
		// navigation.navigate('Graf', { grafType: placeholder+"00" });
		AsyncStorage.setItem("selectGraf", gra);
	};
	// console.log("🚀 ~ changeLanguage ~ i18n.language:", i18n.language);
	// console.log("🚀 ~ changeLanguage ~ fallbackLanguage :", i18n.options.fallbackLng[0]);
	// console.log("🚀 ~ changeLanguage ~ resolvedLanguage :", i18n.resolvedLanguage);

	const [selectedLen, setSelectedLen] = useState(null);
	const [selectedThe, setSelectedThe] = useState(null);
	const [selectedGra, setSelectedGra] = useState(null);

	const options_len = [
		{ label: 'English', value: 'en' },
		{ label: 'Українська', value: 'ua' },
		{ label: 'Čeština', value: 'cz' },
	];
	const options_the = [
		{ label: t("lighttheme"), value: 'li' },
		{ label: t("darktheme"), value: 'da' },
		{ label: t("graytheme"), value: 'gr' },
	];
	const options_gra = [
		{ label: t("standart"), value:"standart" },
		{ label: t("cz-rbcb"), value: "cz-rbcb" },
		{ label: t("ua-haes"), value: "ua-haes" },
		{ label: t("ua-raes"), value: "ua-raes" },
		{ label: t("ua-paes"), value: "ua-paes" },
	];

	//-------------------
	const [visible, setVisible] = useState(false);
	const toggleTooltip = () => {
		setVisible(!visible);
	};
	//------------

useEffect(() => {console.log("🚀 ~ 🚀 SettingsScreen ~ useEffect:")
}, [visible]);

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				source={require("../assets/asfalt.png")}
				style={styles.backgroundImage}
				resizeMode="repeat">
				<View>
					<Text style={styles.maintext}>{t("settings")}</Text>
				</View>
				<View style={{ marginVertical: 15, flex: 0, flexDirection: 'row', justifyContent: "start", }}>
					<View>
						<Text style={styles.textmodal}>{t("language")}:</Text>
					</View>
					<Dropdown
						options={options_len}
						selectedValue={selectedLen}
						onValueChange={(value) => setSelectedLen(value)}
						placeholder={t("selectlanguage")}
						changeLanguage={changeLanguage}
						defLanguage={i18n.resolvedLanguage}
					/>
				</View>
				<View style={{ marginVertical: 15, flex: 0, flexDirection: 'row', justifyContent: "start", }}>
					<View>
						<Text style={styles.textmodal}>{t("theme")}:</Text>
					</View>
					<Dropdown
						options={options_the}
						selectedValue={selectedThe}
						onValueChange={(value) => setSelectedThe(value)}
						placeholder={t("lighttheme")}
						changeLanguage={changeTheme}
					// defLanguage={i18n.resolvedLanguage}
					/>
				</View>
				<View style={{ marginVertical: 15, flex: 0, flexDirection: 'row', justifyContent: "start", }}>
					<View>
						<Text style={styles.textmodal}>{t("graf")}:</Text>
					</View>
					<Dropdown
						options={options_gra}
						selectedValue={selectedGra}
						onValueChange={(value) => setSelectedGra(value)}
						placeholder={t("standart")}
						changeLanguage={changeGraf}
					/>
				</View>

				<View style={styles.container2}>
					<TouchableOpacity onPress={toggleTooltip}>
						<Text style={styles.text2}>Press me</Text>
					</TouchableOpacity>
					{visible && (
						<View style={styles.tooltipContainer}>

							<View style={styles.tooltip}>
								<Text style={styles.text2}>Press me rgdg gdgdvdh вреи вв</Text>
							</View>
							<View style={styles.tooltipArrow} />
						</View>
					)}
				</View>


				<Text style={styles.text}>0елемент0	{"\n"}</Text>


				{/* <View>
					<Text style={[styles.text, { position: "relative", alignSelf: "center", borderWidth: 1, padding: 10, borderColor: "rgba(0,200,100,0.99)" }]}>Press me!!!</Text>
					<MyTooltip2 content={"I will preshed)))"} />

				</View>

				<MyTooltip content={"TBERTBYRYB\nNREBNT 8 \n88888 RYBNUT"} >
					<Text style={styles.text}>1221</Text>
				</MyTooltip> */}


				{/* ограничитель контента с низу чтобы не залазил под кнопки */}
				<View style={{ height: 95 }}></View>
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-evenly",
		alignItems: "center",
		borderTopWidth: 2,
		borderColor: "rgba(100,100,100,0.3)",
	},
	text: {
		fontSize: 20,
		fontWeight: "900",
		// fontFamily: "",
	},
	backgroundImage: {
		width: '100%',
		height: '100%',
	},
	textmodal: {
		fontSize: 18,
		padding: 10,
		backgroundColor: 'lightblue',
		borderRadius: 5,
		marginHorizontal: 15
	},
	maintext: {
		textAlign: "center",
		padding: 5,
		fontSize: 22,
		color: "#553",
		fontWeight: "500",
	},

	container2: {
		alignItems: 'center',
		justifyContent: 'center',

		marginVertical: 15
	},
	text2: {
		fontSize: 20,
		fontWeight: "300",
		width: width / 2,
		textAlign: 'center',
	},

	tooltipContainer: {
		position: 'absolute',
		bottom: '110%',
		alignItems: 'center',
	},
	tooltip: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 10,
		shadowColor: '#000',
		// shadowOffset: { width: 110, height: 122 },
		// shadowOpacity: 0.95, // Увеличенная тень
		// shadowRadius: 100,
		elevation: 25, // Увеличенная тень для Android
	},
	tooltipArrow: {
		width: 0,
		height: 0,
		borderLeftWidth: 10,
		borderRightWidth: 10,
		borderTopWidth: 10,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderTopColor: 'white',
		alignSelf: 'center',
		marginTop: 0,
		// shadowColor: '#000',
		// shadowOffset: { width: 20, height: 22 },
		// shadowOpacity: 0.5,
		// shadowRadius: 6,
		// elevation: 5,
	},


});
