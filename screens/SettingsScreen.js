import React, { useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, SafeAreaView, Dimensions, FlatList, Pressable, Modal, Alert, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateItem from "../components/DateItem";
import ControlBtn from "../components/ControlBtn";
import GlassmorphismButton from "../components/buttons/GlassmorphismButton";
import NeumorphicButton from "../components/buttons/NeumorphicButton";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy";

const { width, height } = Dimensions.get("window"); // Получаем размеры экрана

export default function SettingsScreen() {
  const [showInterval, setShowInterval] = useState("");
  // Инициализируем массивы для имен смен и их смещений
  const [smeniNames, setSmeniNames] = useState(["🍑", "🍌", "🍓", "🍒"]);
  const objSmen = { "🍑": 14, "🍌": 0, "🍓": 7, "🍒": 21 };
  // let shifts = [14, 0, 7, 21];
  let dninedeli = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Инициализируем массив с графиком смен
  let graf_shifts = ["N", "N", "N", "N", "N", "N", "🍺", "E", "E", "E", "E", "🍺", "M", "M", "M", "🍺", "🍺", "🍺", "E", "E", "E", "🍺", "M", "M", "M", "M", "🍺", "☕️"];

  // Инициализируем состояние для сохраненного месяца и видимости модального окна
  const [savedWMYcount, setSavedWMYcount] = useState({ WMY: "M", count: 0 });
  const [modalVisible, setModalVisible] = useState(false);

  // автопрокрутка к тудэю
  // const flatListRef = useRef(null);
  // const scrollToIndex = (index) => {
  //   flatListRef.current?.scrollToIndex({ index, animated: true });
  // };

  // Функция для получения сегодняшней даты
  const getTodayDate = () => {
    const today = new Date();
    let todayDay = today.getDate();
    todayDay < 10 && (todayDay = "0" + todayDay);
    let todayMonth = today.getMonth() + 1;
    todayMonth < 10 && (todayMonth = "0" + todayMonth);
    let todayYear = today.getFullYear();    
    return { todayDay, todayMonth, todayYear };
  };

  const handleDataFromChild = (data) => {
    console.log("🚀🚀🚀 ~ handleDataFromChild ~ data:", data);
    setSmeniNames(data);
  };

  // Функция для получения даты пользователя
  let getUserDate = () => {
    let UD = new Date();
    let UDStart;
    let UDEnd;

    if (savedWMYcount.WMY == "W") {
      const currentDay = UD.getDay() == 0 ? 6 : UD.getDay() - 1;
      // console.log("🚀 ~ getUserDate ~ currentDay:", currentDay)
      UD.setDate(UD.getDate() - currentDay + savedWMYcount.count * 7);
      UDStart = new Date(UD.getFullYear(), UD.getMonth(), UD.getDate()); // =new Date(UD);
      UDEnd = new Date(
        UDStart.getFullYear(),
        UDStart.getMonth(),
        UDStart.getDate() + 6
      );
    }
    if (savedWMYcount.WMY == "M") {
      UD.setMonth(UD.getMonth() + savedWMYcount.count);
      UDStart = new Date(UD.getFullYear(), UD.getMonth(), 1);
      UDEnd = new Date(UDStart.getFullYear(), UDStart.getMonth() + 1, 0);
    }

    if (savedWMYcount.WMY == "Y") {
      UD.setFullYear(UD.getFullYear() + savedWMYcount.count);
      UDStart = new Date(UD.getFullYear(), 0, 1);
      UDEnd = new Date(UDStart.getFullYear(), 11, 31);
    }

    let UDStartDayOfYear = Math.round(
      (UDStart - new Date(UD.getFullYear(), 0, 1)) / (24 * 60 * 60 * 1000)
    );
    // savedWMYcount.WMY == "W"?UDStartDayOfYear-=1:null;

    setShowInterval(
      UDStart.toLocaleDateString() + "  -  " + UDEnd.toLocaleDateString()
    );
    return { UDStart, UDEnd, UDStartDayOfYear };
  };

  // Функция для создания массива дат
  let createMassDate = useMemo(() => {
    let UserDate = getUserDate();
    let givenTD = getTodayDate();
    console.log("🚀 ~ createMassDate ~ UserDate:", UserDate);
    let day, month, year, weekDay, dateText, catchToday;

    let massObjData = [];
    while (UserDate.UDStart <= UserDate.UDEnd) {
      let currentshifts = [];
      day = UserDate.UDStart.getDate();
      month = UserDate.UDStart.getMonth() + 1;
      year = UserDate.UDStart.getFullYear();
      let weekDayNum = UserDate.UDStart.getDay();

      dateText = `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}`;

      if (year == givenTD.todayYear) { 
        catchToday = (dateText == `${givenTD.todayDay}.${givenTD.todayMonth}`); 
      }else { catchToday = false }

      if (savedWMYcount.WMY == "Y") {
        let notFullYear = (year % 100);
        if (notFullYear < 10) { notFullYear = "0" + notFullYear }
        // let todayYear = (today.getFullYear() % 100).toString().padStart(2, "0");
        dateText += "." + notFullYear;        
      }
      weekDay = dninedeli.at(weekDayNum == 0 ? 6 : weekDayNum - 1);

      // weekDayTest = dninedeli.at((UserDate.UDStartDayOfYear % 7) - 1);
      // console.log("🚀 ~ 🚀createMassDate🚀 ~ 🚀weekDayTest: ", weekDayTest)

      smeniNames.forEach((element) => {
        currentshifts.push(graf_shifts[(UserDate.UDStartDayOfYear + objSmen[element]) % graf_shifts.length]);
      });

      massObjData.push({ day: dateText, weekDay, shifts: currentshifts, catchToday });

      UserDate.UDStartDayOfYear++;
      UserDate.UDStart.setDate(UserDate.UDStart.getDate() + 1);
    }
    return massObjData;
  }, [savedWMYcount, smeniNames]);

  return (
    <SafeAreaView style={{
      borderWidth: 0,
      borderColor: "#090",
      padding: 0,
      height: "100%",
      borderTopWidth: 2,
      borderColor: "rgba(100,100,100,0.3)",
      // backgroundColor: "#eee",
    }}>
      <StatusBar
        animated={true}
        barStyle={"light-content"}
        style={styles.stausba}
        hidden={false}
        showHideTransition={"slide"}
        backgroundColor={"#EEEEAA"}
        // currentHeight="50%"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />

      <ImageBackground
        source={require("../assets/asfalt-dark.png")}
        style={styles.backgroundImage}
        resizeMode="repeat">
        {/* <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{ networkExtras: { collapsible: "bottom" } }}
        /> */}

        <View style={styles.container}>
          {/* ----------------- кнопки управления слева ------------------------*/}
          <View style={styles.settings}>
            {savedWMYcount.count ? (<View style={styles.countviever}>
              <NeumorphicButton title={savedWMYcount.WMY + "\n" + (savedWMYcount.count > 0 ? "+" + savedWMYcount.count : savedWMYcount.count)} MyStyle={{ fontSize: 20 }} /></View>) : null}
            <ControlBtn onData={handleDataFromChild} />

            <Pressable
              style={{ marginVertical: 30 }}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons
                name={modalVisible ? "settings" : "settings-outline"}
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
                  <Text style={styles.headS} key={index}>
                    {el}
                  </Text>
                ))}
              </View>

              <FlatList
                data={createMassDate}
                // ref={flatListRef}
                renderItem={({ item }) => (
                  <DateItem item={item} />
                )}
                keyExtractor={(item, index) => index.toString()}
                removeClippedSubviews={false}
              // onLayout={scrollToIndex(UDStartDayOfYear)}
              />
            </View>
          </View>
        </View>

        {/* ограничитель контента с низу чтобы не залазил под кнопки */}
        <View style={{ height:95}}></View>

        {/* модальное окно */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{ width: "90%", borderWidth: 0, marginVertical: 20 }}
              >
                <Pressable
                  style={styles.button}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}> X </Text>
                </Pressable>
              </View>
              <View style={{ flexDirection: "row" }}>
                <GlassmorphismButton
                  title={"Week"}
                  onPress={savedWMYcount.WMY == "W" ? null : () => setSavedWMYcount((current) => ({ WMY: "W", count: 0, }))}
                  MyStyle={savedWMYcount.WMY == "W" ? { fontSize: 22, color: "#900", opacity: 0.2 } : { fontSize: 28 }}
                />
                <View style={{ marginHorizontal: 5 }} />
                <GlassmorphismButton
                  title={"Month"}
                  onPress={savedWMYcount.WMY == "M" ? null : () => setSavedWMYcount((current) => ({ WMY: "M", count: 0, }))}
                  MyStyle={savedWMYcount.WMY == "M" ? { fontSize: 22, color: "#900", opacity: 0.2 } : { fontSize: 28 }}
                />
                <View style={{ marginHorizontal: 5 }} />
                <GlassmorphismButton
                  title={"Year"}
                  onPress={savedWMYcount.WMY == "Y" ? null : () => setSavedWMYcount((current) => ({ WMY: "Y", count: 0, }))}
                  MyStyle={savedWMYcount.WMY == "Y" ? { fontSize: 22, color: "#900", opacity: 0.2 } : { fontSize: 28 }
                  }
                />
              </View>

              <NeumorphicButton
                title={showInterval}
                MyStyle={{ fontSize: 20 }}
              />
              {/* <Text>{}</Text> */}
              <View style={{ flexDirection: "row", marginVertical: 15 }}>
                <GlassmorphismButton
                  title={" 👈 "}
                  onPress={() => setSavedWMYcount((current) => ({ WMY: current.WMY, count: current.count - 1 }))}
                />
                <View style={{ marginHorizontal: 15 }} />
                <GlassmorphismButton
                  title={" ⚪️ "}
                  onPress={() => setSavedWMYcount((current) => ({ WMY: current.WMY, count: 0 }))}
                />
                <View style={{ marginHorizontal: 15 }} />
                <GlassmorphismButton
                  title={" 👉 "}
                  onPress={() => setSavedWMYcount((current) => ({ WMY: current.WMY, count: current.count + 1 }))}
                />
                {/* ➖➕✖️ 🫵 ⚪️✊*/}
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>

    </SafeAreaView>
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
    flexDirection: "row",
  },
  headD: {
    flex: 1.8,
    borderRightWidth: 0,
    borderColor: "#000",
    margin: 1,
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    textAlignVertical: "center",
  },
  headW: {
    flex: 1.2,
    margin: 1,
    marginHorizontal: 5,
    fontWeight: "900",
    textAlignVertical: "center",
    textAlign: "center",
  },
  headS: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100%",
  },
  modalView: {
    // margin: 20,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    // minHeight: "20%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.95,
    shadowRadius: 5,
    elevation: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 10,
    backgroundColor: "skyblue",
  },
  buttonDisable: {
    opacity: 0.3,
  },
  countviever: {
    height: "auto",
    borderWidth: 0,
    justifyContent: "flex-start",
    flexDirection: "column",
    flex: 1,
    paddingTop: 20,
  },

  backgroundWrapper: {
    position: "absolute",
    width: width,
    height: height + 20,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    borderWidth: 0,
  },
});
