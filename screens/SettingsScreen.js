import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions, ScrollView, FlatList, Pressable, Modal, Alert, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateItem from "../components/DateItem";
import ControlBtn from "../components/ControlBtn";
import MinimalistButton from "../components/buttons/MinimalistButton";
import GlassmorphismButton from "../components/buttons/GlassmorphismButton";
import NeumorphicButton from "../components/buttons/NeumorphicButton";


const { width, height } = Dimensions.get('window'); // Получаем размеры экрана

export default function SettingsScreen() {
  const [showInterval, setShowInterval] = useState("");
  // Инициализируем массивы для имен смен и их смещений
  const [smeniNames, setSmeniNames] = useState(["🍑", "🍌", "🍓", "🍒"]);
  const objSmen = { "🍑": 14, "🍌": 0, "🍓": 7, "🍒": 21 }
  // let shifts = [14, 0, 7, 21];
  let dninedeli = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  // Инициализируем массив с графиком смен
  let graf_shifts = ["N", "N", "N", "N", "N", "N", "🍺", "O", "O", "O", "O", "🍺", "R", "R", "R", "🍺", "🍺", "🍺", "O", "O", "O", "🍺", "R", "R", "R", "R", "🍺", "☕️"];

  // Инициализируем состояние для сохраненного месяца и видимости модального окна
  const [savedWMYcount, setSavedWMYcount] = useState({ WMY: "M", count: 0 });
  const [modalVisible, setModalVisible] = useState(false);

  const handleDataFromChild = (data) => {
    console.log("🚀🚀🚀 ~ handleDataFromChild ~ data:", data)
    setSmeniNames(data);
  };

  // Функция для получения даты пользователя
  let getUserDate = () => {
    let UD = new Date();
    let UDStart; let UDEnd; 

    if (savedWMYcount.WMY == "M") {
      UD.setMonth(UD.getMonth() + savedWMYcount.count);
      UDStart = new Date(UD.getFullYear(), UD.getMonth(), 1);
      UDEnd = new Date(UDStart.getFullYear(), UDStart.getMonth() + 1, 0);

    }
    if (savedWMYcount.WMY == "W") {
      const currentDay = (UD.getDay() == 0) ? 6 : (UD.getDay() - 1);
      console.log("🚀 ~ getUserDate ~ currentDay:", currentDay)
      UD.setDate(UD.getDate() - currentDay + (savedWMYcount.count * 7));
      UDStart = new Date(UD);	// = new Date(UD.getFullYear(), UD.getMonth(), UD.getDate())
      UDEnd = new Date(UDStart.getFullYear(), UDStart.getMonth(), UDStart.getDate() + 6, 23, 59, 59);
    }
    if (savedWMYcount.WMY == "Y") {
      UD.setFullYear(UD.getFullYear() + savedWMYcount.count);
      UDStart = new Date(UD.getFullYear(), 0, 1);
      UDEnd = new Date(UDStart.getFullYear(), 11, 31);
    }

    let UDStartDayOfYear = Math.round((UDStart - new Date(UD.getFullYear(), 0, 1)) / (24 * 60 * 60 * 1000));

    setShowInterval(UDStart.toLocaleDateString() + "  -  " + UDEnd.toLocaleDateString())
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
      let weekDayNum = UserDate.UDStart.getDay();

      dateText = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}${savedWMYcount.WMY == "Y" ? "." + (UserDate.UDStart.getFullYear() - 2000) : ""}`;
      weekDay = dninedeli.at((weekDayNum == 0) ? 6 : (weekDayNum - 1));

      // weekDayTest = dninedeli.at((UserDate.UDStartDayOfYear % 7) - 1);
      // console.log("🚀 ~ 🚀createMassDate🚀 ~ 🚀weekDayTest: ", weekDayTest)

      smeniNames.forEach(element => {
        currentshifts.push(graf_shifts[(UserDate.UDStartDayOfYear + objSmen[element]) % graf_shifts.length])
      });

      massObjData.push({ day: dateText, weekDay, shifts: currentshifts });

      UserDate.UDStartDayOfYear++;
      UserDate.UDStart.setDate(UserDate.UDStart.getDate() + 1);
    }
    return massObjData;
  }, [savedWMYcount, smeniNames]);

  return (
    <SafeAreaView style={{ borderWidth: 0, borderColor: "#090", padding: 0, height: "100%", backgroundColor: "#eee", }}>
      <View style={styles.backgroundWrapper}>
        <ImageBackground
          source={require("../assets/asfalt-dark.png")}
          style={styles.backgroundImage}
          resizeMode="repeat"
        >
          <View style={styles.container}>
            {/* ----------------- кнопки управления слева ------------------------*/}
            <View style={styles.settings}>
              {savedWMYcount.count?(<View style={{ height: "auto", borderWidth: 0, justifyContent: "flex-start", flexDirection: "column", flex: 1, paddingTop: 20 }}>
                <NeumorphicButton title={savedWMYcount.WMY + "\n" + ((savedWMYcount.count > 0) ? ("+" + savedWMYcount.count) : savedWMYcount.count)} MyStyle={{ fontSize: 20 }} />
              </View>):null}
              <ControlBtn onData={handleDataFromChild} />

              <Pressable
                style={{ marginVertical: 30 }}
                onPress={() => setModalVisible(true)}>
                <Ionicons
                  name={modalVisible ? 'settings' : 'settings-outline'}
                  size={42}
                  color="#464"
                // onPress={() => setModalVisible(true)}
                />
              </Pressable>
            </View>
            {/* ----------------- END кнопки управления слева ------------------------*/}
            <View style={styles.shifts}>
              <View style={{ maxHeight: "100%" }}>
                <View style={styles.headrow}>
                  <Text style={styles.headD}>Date</Text>
                  <Text style={styles.headW}>Week</Text>
                  {smeniNames.map((el, index) => (
                    <Text style={styles.headS} key={index}>{el}</Text>))}
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

          {/* ограничитель контента с низу чтобы не залазил под кнопки */}
          <View style={{
            height: 110,
            borderWidth: 0,
            borderColor: "#900",
            // backgroundColor: "#eea" 
          }}></View>

          {/* модальное окно */}
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
                <View style={{ width: "90%", borderWidth: 0, marginVertical: 20 }}>
                  <Pressable
                    style={styles.button}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}> X </Text>
                  </Pressable>
                </View>
                <View style={{ flexDirection: "row" }}>

                  <GlassmorphismButton title={"Week"} onPress={
                    savedWMYcount.WMY == "W" ? null : () => setSavedWMYcount(current => ({ WMY: "W", count: 0 }))} MyStyle={savedWMYcount.WMY == "W" ? { fontSize: 22, color: '#900', opacity: 0.2, } : null} />
                  <View style={{ marginHorizontal: 5 }} />
                  <GlassmorphismButton title={"Month"} onPress={
                    savedWMYcount.WMY == "M" ? null : () => setSavedWMYcount(current => ({ WMY: "M", count: 0 }))} MyStyle={savedWMYcount.WMY == "M" ? { fontSize: 22, color: '#900', opacity: 0.2, } : { fontSize: 24 }} />
                  <View style={{ marginHorizontal: 5 }} />
                  <GlassmorphismButton title={"Year"} onPress={
                    savedWMYcount.WMY == "Y" ? null : () => setSavedWMYcount(current => ({ WMY: "Y", count: 0 }))} MyStyle={savedWMYcount.WMY == "Y" ? { fontSize: 22, color: '#900', opacity: 0.2, } : { fontSize: 24 }} />
                </View>

                <NeumorphicButton title={showInterval} MyStyle={{ fontSize: 20 }} />
                {/* <Text>{}</Text> */}
                <View style={{ flexDirection: "row", marginVertical: 15 }}>
                  <GlassmorphismButton title={" 👈 "} onPress={() => setSavedWMYcount(current => ({ WMY: current.WMY, count: current.count - 1 }))} />
                  <View style={{ marginHorizontal: 15 }} />
                  <GlassmorphismButton title={" ⚪️ "} onPress={() => setSavedWMYcount(current => ({ WMY: current.WMY, count: 0 }))} />
                  <View style={{ marginHorizontal: 15 }} />
                  <GlassmorphismButton title={" 👉 "} onPress={() => setSavedWMYcount(current => ({ WMY: current.WMY, count: current.count + 1 }))} />
                  {/* ➖➕✖️ 🫵 ⚪️✊*/}
                </View>
              </View>
            </View>
          </Modal>
        </ImageBackground>
      </View>
    </SafeAreaView >
  );
}



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

  headrow: {
    paddingRight: 5,
    paddingLeft: 3,
    marginBottom: 7,
    borderBottomWidth: 2,
    borderColor: "#000",
    flexDirection: 'row',
  },
  headD: { flex: 1.8, borderRightWidth: 0, borderColor: "#000", margin: 1, fontSize: 18, fontWeight: "900", textAlign: "center", textAlignVertical: "center", },
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

  settings: {
    // borderWidth: 1, 
    // backgroundColor: 'rgba(255, 255, 255, 0.3)',
    flex: 0,
    width: "auto",
    padding: 2,
    // flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  shifts: {
    // width: "auto",
    // flexGrow: 0.8,
    // borderWidth: 1,
    // marginLeft: 5, 
    // borderColor: "#11f",
    justifyContent: "center",
    // alignItems: "center",

    flex: 1,
    // height: "100%",
    // margin: 1,
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
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    // minHeight: "20%",
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
    elevation: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 10,
    backgroundColor: '#51b6F3',
  },
  buttonDisable: {
    opacity: 0.3
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
