import React, { useMemo, useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, SafeAreaView, Dimensions, FlatList, Pressable, Modal, Alert, ImageBackground, TextInput, ActivityIndicator, Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateItem from "../components/DateItem";
import ControlBtn from "../components/ControlBtn";
import GlassmorphismButton from "../components/buttons/GlassmorphismButton";
import NeumorphicButton from "../components/buttons/NeumorphicButton";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { useTranslation } from 'react-i18next';
import '../i18n';
import SaveAndDellButton from "../components/buttons/SaveAndDellButton";
import Graphs from '../file_with_graphs.json';
// import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import Dropdown from "../components/Dropdown";


// *************реклама admob************************
const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : "ca-app-pub-2176611440724330/4316002883";

// Получаем размеры экрана
const { width, height } = Dimensions.get("window");

let showInterval;
let grafShifts;
let viewchoisedateNotific = ["31.12.2024", ["Happy New Year"]];
let optionsD = { month: "numeric", day: "numeric" };
let optionsDY = { ...optionsD, year: "numeric" };



export default function GrafScreen() {

  // const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (event.type === 'set') {
      // console.log("🚀 ~ onChange ~ selectedDate:", selectedDate)
      // console.log("🚀 ~ onChange ~ event:", (new Intl.DateTimeFormat('ua-UA', optionsD).format(selectedDate)))
      const currentDate = selectedDate || date;
      setDate(() => currentDate);
      let to_string = new Intl.DateTimeFormat('ua-UA', optionsDY).format(currentDate)
      switching(to_string);
    }
  };

  // console.log("🍑\n🍑\n🍑\n🍑" )
  const { t, i18n } = useTranslation();

  // *************delete ************
  // const [getGrafType, setGetGrafType] = useState("standart");
  // *************delete ************

  const [grafSettings, setGrafSettings] = useState({ "type": "standart", "weeknum": false, "colorscheme": false, "dayofficon": false, "notific":false });
  console.log("🚀🍑🍒🍒🍒🍒🍒🍒🍒🍒 ~ GrafScreen ~ grafSettings:", grafSettings)
  const [smeniNames, setSmeniNames] = useState(undefined);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  // Инициализируем состояние для сохраненного месяца (недели или года) count-та 
  const [savedWMYcount, setSavedWMYcount] = useState({ WMY: "M", count: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSettingsVisible, setModalSettingsVisible] = useState(false);
  const [modalNowDateVisible, setModalNowDateVisible] = useState([false, false]);

  const [notifications, setNotifications] = useState([]);
  console.log("\n\n🚀🍑\n🍑\n🍑\n🍑🚀 ~ GrafScreen ~ notifications:", notifications)

  //// ------------------Константы и переменные---------------------////
  const dninedeli = [t("Monday"), t("Tuesday"), t("Wednesday"), t("Thursday"), t("Friday"), t("Saturday"), t("Sunday")];
  // Инициализируем массив с графиком смен по умолчанию при первом запуске
  grafShifts = Graphs[grafSettings.type];
  let selSmeniNames = smeniNames || [...grafShifts.shifts];
  // часть смен выбранная пользователем и отображаемая на графике
  let splitingSmeniNames = [...selSmeniNames.join("").split("*")[0]];
  const options_gra = [
    { label: t("standart"), value: "standart" },
    { label: t("cz-rbcb"), value: "cz-rbcb" },
    { label: t("ua-haes"), value: "ua-haes" },
    { label: t("ua-raes"), value: "ua-raes" },
    { label: t("ua-paes"), value: "ua-paes" },
    { label: t("ua-zaes"), value: "ua-zaes" },
  ];


  // useFocusEffect(
  //   useCallback(() => {
  //     AsyncStorage.getItem("selectGraf").then((value) => {
  //       if (value !== null) {
  //         setGetGrafType(prevValue => {
  //           if (value !== prevValue) {
  //             setSmeniNames(undefined);
  //             return value
  //           }
  //           return prevValue
  //         });
  //       }
  //     }).catch((error) => console.log(error));

  //     return
  //   }, [])
  // );

  useEffect(() => {
    AsyncStorage.getItem("GrafSettings")
      .then((value) => {
        console.log("\n\n🍑\n🍑\n🍑\n🍑\n\n ~ GrafSettings ~ value:", value + "")
        if (value !== null) { setGrafSettings(() => JSON.parse(value)); }
      })
      .catch((error) => console.log("GrafSettings ERR: " + error));

    AsyncStorage.getItem("language")
      .then((value) => {
        if (value !== null) { i18n.changeLanguage(value); }
      })
      .catch((error) => console.log("language ERR: " + error));

    AsyncStorage.getItem("notifications")
      .then((value) => {
        console.log("\n\n🚀\n🚀\n🚀\n🚀\n\n ~ .then ~ value:", value + "")

        if (value !== null) { setNotifications(() => JSON.parse(value)); }
      })
      .catch((error) => console.log("notifications ERR: " + error));

  }, []);

  //  AsyncStorage.removeItem('selectGraf');
  // AsyncStorage.removeItem('language');
  // AsyncStorage.setItem("notifications", JSON.stringify({"15.07.2024":["qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm","two","three","qwertyui opasdfghjklz xcvbn mqwertyui opasd fghjklzxcv bnmqwertyuio pasdfghjklzxcvbnm"],"10.07.2024":["hi","by"],"01.07.2024":["1","2","3","4","5","6","7","8","9"]}));


  const handleFromControlBtn = (data) => {
    setSmeniNames([...data]);
  };

  const renderDateItem = useCallback(({ item }) => {
    return <DateItem item={item} modalviewdata={modalviewdata} settings={grafSettings} />;
  }, [notifications, grafSettings]);

  const modalviewdata = (seldate, back) => {
    viewchoisedateNotific = [seldate, notifications[seldate] || []];

    console.log("🚀🍑🍌🍓🍒 ~ modalviewdata ~ date:", date, "\nviewchoisedateNotific - ", viewchoisedateNotific)

    setModalNowDateVisible([true, back]);
  }

  const delElemOrDate = (date, index) => {
    modalNowDateVisible[1] && (setModalNowDateVisible([false, false]), setModalVisible(true))
    setNotifications((prev) => {
      if (prev[date].length == 1 || index == undefined) {
        delete prev[date];
        setModalNowDateVisible([false, false])
      } else { prev[date].splice(index, 1) }
      saveData({ ...prev });
      return { ...prev };
    });
  };

  const showConfirm = () => {
    Alert.alert(
      t("confirm"),
      t("wanttodothis"),
      [{ text: t("cancel"), onPress: () => console.log("Cancel Pressed"), style: "cancel" },
      { text: t("ok"), onPress: () => delElemOrDate(viewchoisedateNotific[0]) }],
      { cancelable: true }
    )
  };

  // Функция для преобразования строки даты в формат, который понимает Date.parse()
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('.');
    return `${year}-${month}-${day}`;
  };

  let textInputElement = null;
  let textInputValue = '';
  const addElemOnDate = (date) => {
    console.log("🚀 ~ addElemOnDate ~ date:", date);
    console.log("🚀 ~ addElemOnDate ~ textInputValue:", textInputValue);
    if (textInputValue) {
      setNotifications((prev) => {
        prev[date] ? prev[date].unshift(textInputValue) : prev[date] = [textInputValue];
        let sortedKeys = Object.keys(prev).sort((a, b) =>
          Date.parse(parseDate(a)) - Date.parse(parseDate(b)));
        let newsortobj = {};
        sortedKeys.forEach(item => { newsortobj[item] = prev[item] })

        saveData(newsortobj);
        return newsortobj
      });
    }
    viewchoisedateNotific = [date, notifications[date] || []];
  }

  const saveData = async (newNotifications) => {
    console.log("\n\n🚀 🚀 🚀 ~ saveData ~ newListtodos:", newNotifications)
    try {
      await AsyncStorage.setItem("notifications", JSON.stringify(newNotifications));
    } catch (error) {
      alert("Ошибка - " + error);
      console.log(error);
    }
  };


  const switching = (date) => {
    setModalVisible(false);
    modalviewdata(date, true)
  }
  const changeGrafType = (gra) => {
    AsyncStorage.setItem("GrafSettings", JSON.stringify({ ...grafSettings, "type": gra }));
  };
  const saveGrafSettings = (set) => { console.log("🚀🚀 ~🚀🚀 GrafScreen🚀🚀 ~ grafSettings:", grafSettings); AsyncStorage.setItem("GrafSettings", JSON.stringify(set)) };




  // Функция для получения сегодняшней даты
  const getTodayDate = () => {
    const today = new Date();
    let todayDay = today.getDate();
    todayDay < 10 && (todayDay = "0" + todayDay);
    let todayMonth = today.getMonth() + 1;
    todayMonth < 10 && (todayMonth = "0" + todayMonth);
    let todayYear = today.getFullYear();

    return { today, todayDay, todayMonth, todayYear };
  };

  // Функция для получения даты пользователя
  let getUserDate = (add) => {
    let UD = new Date();
    let UDStart;
    let UDEnd;

    if (savedWMYcount.WMY == "W") {
      const currentDay = UD.getDay() == 0 ? 6 : UD.getDay() - 1;
      // console.log("🚀 ~ getUserDate ~ currentDay:", currentDay)
      UD.setDate(UD.getDate() - currentDay + savedWMYcount.count * 7);
      UDStart = new Date(UD.getFullYear(), UD.getMonth(), UD.getDate()); // =new Date(UD);
      let UDEndDate = add ? UDStart.getDate() + 6 * add : UDStart.getDate() + 6;
      UDEnd = new Date(
        UDStart.getFullYear(),
        UDStart.getMonth(),
        UDEndDate
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

    showInterval = UDStart.toLocaleDateString() + "  -  " + UDEnd.toLocaleDateString();
    // setShowInterval(UDStart.toLocaleDateString() + "  -  " + UDEnd.toLocaleDateString());
    return { UDStart, UDEnd, UDStartDayOfYear };
  };

  // Функция для создания массива дат с getDate()
  let createMassDate = useMemo(() => {
    // setLoading(true); 
    let UserDate = getUserDate();
    let givenTD = getTodayDate();
    let givenTDformat = new Intl.DateTimeFormat('ua-UA', optionsDY).format(givenTD.today);
    let year, weekDay, dateText, catchToday, weekNum, Notific;
    let pastOrNot = false;
    let massObjData = [];
    // расчет времени выполнения кода
    let startTime = performance.now();

    while (UserDate.UDStart <= UserDate.UDEnd) {
      let currentshifts = [];

      day = UserDate.UDStart.getDate().toString().padStart(2, "0");
      month = (UserDate.UDStart.getMonth() + 1).toString().padStart(2, "0");
      year = UserDate.UDStart.getFullYear();
      let weekDayNum = UserDate.UDStart.getDay();

      dateText = `${day}.${month}`;
      Notific = notifications[dateText + "." + year] ? notifications[dateText + "." + year].length : null;
      catchToday = (dateText + "." + year) == givenTDformat;
      if (givenTD.today < UserDate.UDStart) { pastOrNot = true };

      if (savedWMYcount.WMY == "Y") {
        // let notFullYear = (year % 100);
        // if (notFullYear < 10) { notFullYear = "0" + notFullYear }
        let notFullYear = (year % 100).toString().padStart(2, "0");
        dateText += "." + notFullYear;
      }
      weekDay = dninedeli.at(weekDayNum == 0 ? 6 : weekDayNum - 1);
      weekNum = Math.ceil((UserDate.UDStartDayOfYear + 4 - (weekDayNum + 6) % 7) / 7);

      console.log("🚀☕️☕️☕️☕️☕️🚀 ~ createMassDate ~ Notific:", "dateText=", dateText, "pastOrNot=", pastOrNot)
      // console.log("🚀☕️☕️☕️☕️☕️🚀 ~ createMassDate ~ Notific:", notifications, notifications[dateText + "." + year],"pastOrNot=",pastOrNot)
      splitingSmeniNames.forEach((element) => {
        currentshifts.push(grafShifts.graf[(UserDate.UDStartDayOfYear + grafShifts.offset[element]) % grafShifts.graf.length]);
      });

      massObjData.push({ day: dateText, weekDay, shifts: currentshifts, catchToday, weekNum, Notific, pastOrNot, year });

      UserDate.UDStartDayOfYear++;
      UserDate.UDStart.setDate(UserDate.UDStart.getDate() + 1);
    }
    // E N D расчет времени выполнения кода 
    endTime = performance.now();
    console.log(`▶️▶️▶️▶️▶️Direct methods: ${endTime - startTime} ms`);


    // setTimeout(() => {     
    // setLoading(false);
    // }, 10); 


    return massObjData;
  }, [savedWMYcount, smeniNames, grafSettings, i18n.language, notifications]);

  return (
    <SafeAreaView style={{
      borderWidth: 0,

      padding: 0,
      height: "100%",
      // borderTopWidth: 2,
      // borderColor: "rgba(100,200,100,0.93)",
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
        <View style={isAdLoaded ? { height: "auto" } : { height: 0 }}>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{ networkExtras: { collapsible: "bottom" } }}
            onAdLoaded={() => setIsAdLoaded(true)}
            onAdFailedToLoad={() => setIsAdLoaded(false)}
          />
        </View>

        <View style={styles.container}>

          {/* {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )} */}

          {/* ----------------- кнопки управления слева ------------------------ */}
          <View style={styles.settings}>

            {savedWMYcount.count ? (<View style={styles.countviever}>
              <NeumorphicButton title={` ${t(savedWMYcount.WMY)} \n` + (savedWMYcount.count > 0 ? "+" + savedWMYcount.count : savedWMYcount.count)} MyStyle={{ lineHeight: 18, fontSize: 18, fontWeight: "500" }} onPress={() => setSavedWMYcount((pre) => ({ ...pre, count: 0 }))} /></View>) : null}

            <View style={styles.addbtnviever}>
              <SaveAndDellButton title={<Ionicons name="notifications-outline" size={40} color="#fff" style={{ lineHeight: 48, letterSpacing: 5 }} />} onPress={() => setModalVisible(true)} SaveOrDell={1} myStyle={{ color: "#fff" }} MyStyleBTN={{ width: "auto", marginHorizontal: 0, }} />
            </View>

            <ControlBtn handleFromControlBtn={handleFromControlBtn} firstLoad={selSmeniNames} />

            <View style={{ marginVertical: 5 }}>
              {/* {modalSettingsVisible ? <GlassmorphismButton title={"⚙️"} MyStyle={{ fontSize: 30 }} /> : <NeumorphicButton title={"⚙️"} onPress={() => setModalSettingsVisible(true)} MyStyle={{ fontSize: 30 }} />} */}
              {modalSettingsVisible ? <GlassmorphismButton title={<Ionicons name="construct" size={40} color="#464" style={{ margin: 5 }} />} /> : <NeumorphicButton title={<Ionicons name="construct" size={40} color="#666" />} onPress={() => setModalSettingsVisible(true)} />}
            </View>

          </View>
          {/* ----------------- END кнопки управления слева ------------------------*/}
          <View style={styles.shifts}>
            <View style={{ maxHeight: "100%" }}>

              <Dropdown
                myStyles={true}
                options={options_gra}
                selectedValue={t(grafSettings.type)}
                onValueChange={(_, value) => setGrafSettings(() => {
                  setSmeniNames(undefined);
                  return { ...grafSettings, "type": value }
                })
                }
                placeholder={t("standart")}
                changeLanguage={changeGrafType}
              />

              <View style={styles.headrow}>
                <Text style={styles.headD}>{t("tabdate")}</Text>
                <Text style={styles.headW}>{t("tabweek")}</Text>
                {splitingSmeniNames.map((el, index) => (
                  <Text style={styles.headS} key={index}>
                    {el}
                  </Text>
                ))}
              </View>

              <FlatList
                data={createMassDate}
                // ref={flatListRef}
                renderItem={renderDateItem}
                keyExtractor={(item, index) => index.toString()}
                // initialScrollIndex={16}
                // initialNumToRender={50}
                removeClippedSubviews={false}
                // onLayout={scrollToIndex(UDStartDayOfYear)}
                // contentContainerStyle={{ paddingHorizontal: 5 }}
                style={{ zIndex: 1 }}
                contentContainerStyle={{
                  zIndex: 1,
                  // overflow: 'visible', borderWidth: 1, position: "relative",
                }}
              // getItemLayout={(item, index) => (
              //   { length: 50, offset: 50 * index, index }
              // )}
              // ListFooterComponent={renderFooterFlatList}
              />
            </View>
          </View>
        </View>

        {/* ограничитель контента с низу чтобы не залазил под кнопки */}
        <View style={{ height: 95 }}></View>

        {/* -----------------------------------------------------
 -------------- модалка по отдельным датам ---------------
 ---------------------------------------------------------*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalNowDateVisible[0]}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalNowDateVisible([false, false]);
          }}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)" }}>
            <View style={{ borderColor: "#000", borderWidth: 1, width: "90%", backgroundColor: "white", borderRadius: 20, justifyContent: "flex-start", maxHeight: "80%", paddingBottom: 15 }}>

              <View style={{ flex: 0, flexDirection: "row", borderWidth: 0, marginVertical: 15, marginHorizontal: 15 }}>
                {modalNowDateVisible[1] && (<SaveAndDellButton title={<Ionicons name="arrow-back" size={40} color="#fff" />} onPress={() => { setModalNowDateVisible([false, false]); modalNowDateVisible[1] && setModalVisible(true) }} SaveOrDell={1} MyStyleBTN={{ marginHorizontal: 0, marginVertical: 0, borderRadius: 10, width: "40%", elevation: 10, }} />)}

                <SaveAndDellButton title={<Ionicons name="close" size={40} color="#fff" />} onPress={() => setModalNowDateVisible([false, false])} SaveOrDell={1} MyStyleBTN={{ marginHorizontal: 0, marginVertical: 0, borderRadius: 10, elevation: 10, ...(modalNowDateVisible[1]) ? { width: "40%", marginLeft: "20%" } : { width: "90%", marginLeft: "5%" } }} />

              </View>
              <Text style={{ fontSize: 22, fontWeight: "900", marginBottom: 10, borderWidth: 0, marginHorizontal: 15, textAlign: "center" }} >{viewchoisedateNotific[0]}</Text>

              <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: 'center',
                padding: 3,
                marginVertical: 5,
                marginHorizontal: 15,
              }}>
                <TextInput style={{ borderBottomWidth: 3, borderColor: "skyblue", flex: 1, fontSize: 20, padding: 5, marginHorizontal: 5 }}
                  ref={(input) => { textInputElement = input; }}
                  onEndEditing={(e) => { textInputElement && textInputElement.clear() }}
                  placeholder={""}
                  placeholderTextColor="gray"
                  onChangeText={(e) => { textInputValue = e }}
                  maxLength={50}
                  value={() => textInputValue}
                />
                <SaveAndDellButton title={<Ionicons name="add" size={40} color="#eee" />} onPress={() => {
                  addElemOnDate(viewchoisedateNotific[0]);
                  textInputElement && textInputElement.clear()
                }} SaveOrDell={1} MyStyleBTN={{ width: "auto", marginHorizontal: 2, marginVertical: 0, }} />
              </View>

              <FlatList
                data={viewchoisedateNotific[1]}
                renderItem={(el) => (
                  <View style={styles.oneNoteItem} key={el.index}>
                    <Text style={styles.oneNoteItemText}>{el.item}</Text>

                    <SaveAndDellButton title={<Ionicons name="trash-outline" size={40} color="#eee" />} onPress={() => delElemOrDate(viewchoisedateNotific[0], el.index)} SaveOrDell={0} MyStyleBTN={{ width: "auto", marginHorizontal: 2, marginVertical: 0, }} />

                  </View>)
                }
                keyExtractor={(el, index) => index.toString()}
                style={{ marginBottom: 0, }}
              />

              {(viewchoisedateNotific[1].length > 2) && (<SaveAndDellButton title={t("dellall")} onPress={showConfirm} SaveOrDell={0} myStyle={{ color: "#444" }} MyStyleBTN={{ width: "60%", marginLeft: "20%", marginRight: "20%" }} />)}
            </View>
          </View>
        </Modal>
        {/* -----------------------------------------------------
 -------------- E N D модалка по отдельным датам ---------------
 -------------------------------------------------------------*/}

        {/*------ модалка по ВСЕМ датам ------------*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(false)
          }}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)", }}>
            <View style={{ borderColor: "#000", borderWidth: 1, width: "96%", backgroundColor: "white", borderRadius: 20, justifyContent: "flex-start", maxHeight: "80%", }}>

              <View style={{ flex: 0, flexDirection: "row", borderWidth: 0, marginTop: 15, marginBottom: 5, marginHorizontal: 15 }}>
                <NeumorphicButton title={<FontAwesome6 name="add" size={36} color="#666" />} onPress={() => setShow(true)} MyStyleBTN={{ paddingVertical: 0, marginVertical: 0, width: "40%", marginRight: "20%" }} />
                <SaveAndDellButton title={<Ionicons name="close" size={40} color="#fff" />} onPress={() => setModalVisible(false)} SaveOrDell={1} MyStyleBTN={{ borderRadius: 10, elevation: 10, width: "40%", marginHorizontal: 0, marginVertical: 0, }} />
              </View>

              <Text style={{ fontSize: 20, marginBottom: 5, fontWeight: "900", textAlign: "center", }}>{t("allnotifications")}</Text>

              <Text style={{ fontSize: 24, marginBottom: 5, fontWeight: "900", textAlign: "center", color: "skyblue" }}>{new Intl.DateTimeFormat('ua-UA', optionsDY).format(new Date())}</Text>

              <FlatList
                data={Object.keys(notifications)}
                renderItem={(el) => {
                  let pastOrNot = Date.parse(parseDate(el.item)) > Date.now();
                  return (<View style={styles.allNoteItem} key={el.index}>
                    <Pressable onPress={() => { switching(el.item) }} style={pastOrNot ? { backgroundColor: "rgba(200,255,255,1)", borderRadius: 10 } : { backgroundColor: "rgba(255,210,180,1)", borderRadius: 10 }}>
                      <Text style={styles.allNoteItemTextDate}>{el.item.split(".")[0] + "." + el.item.split(".")[1] + "\n"}<Text style={styles.allNoteItemTextYear}>{el.item.split(".")[2]}</Text></Text></Pressable>
                    <Text style={styles.allNoteItemText}>{"\u25CB " + notifications[el.item].join(`\n\u25CB `)}</Text>
                  </View>
                  )
                }
                }
                keyExtractor={(el, index) => index.toString()}
                style={{ marginBottom: 5, paddingBottom: 10, }}
              />

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  display="calendar"
                  onChange={onChange}
                  // textColor="#FF0000"
                  themeVariant="light"

                />)}

            </View>
          </View>
        </Modal>

        {/* модальное окно */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalSettingsVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalSettingsVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <View style={{ width: "90%", borderWidth: 0, marginVertical: 20 }}   >
                <Pressable style={styles.button} onPress={() => setModalSettingsVisible(false)} >
                  <Text style={styles.textStyle}> X </Text>
                </Pressable>
              </View>

              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>{t("graycolsch")}</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={"#f4f3f4"}
                  onValueChange={() => {
                    setGrafSettings((prev) => {
                      let nevsetings = { ...prev, "colorscheme": !prev.colorscheme };
                      saveGrafSettings(nevsetings)
                      return nevsetings
                    })
                  }}
                  value={grafSettings.colorscheme}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>{t("notific")}</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={"#f4f3f4"}
                  onValueChange={() => {
                    setGrafSettings((prev) => {
                      let nevsetings = { ...prev, "notific": !prev.notific };
                      saveGrafSettings(nevsetings)
                      return nevsetings
                    })
                  }}
                  value={grafSettings.notific}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>{t("numweek")}</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={"#f4f3f4"}
                  onValueChange={() => {
                    setGrafSettings((prev) => {
                      let nevsetings = { ...prev, "weeknum": !prev.weeknum };
                      saveGrafSettings(nevsetings)
                      return nevsetings
                    })
                  }}
                  value={grafSettings.weeknum}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>{t("iweekend")}</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={"#f4f3f4"}
                  onValueChange={() => {
                    setGrafSettings((prev) => {
                      let nevsetings = { ...prev, "dayofficon": !prev.dayofficon };
                      saveGrafSettings(nevsetings)
                      return nevsetings
                    })
                  }}
                  value={grafSettings.dayofficon}
                />
              </View>

              <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 20 }}>
                <GlassmorphismButton
                  title={t("week")}
                  onPress={savedWMYcount.WMY == "W" ? null : () => setSavedWMYcount(() => ({ WMY: "W", count: 0 }))}
                  MyStyle={savedWMYcount.WMY == "W" ? { fontSize: 26 } : { fontSize: 22, color: "#000", opacity: 0.4 }}
                  MyStyleBTN={(savedWMYcount.WMY == "W") && { borderColor: "#000", borderWidth: 2 }}
                />
                <View style={{ marginHorizontal: 5 }} />
                <GlassmorphismButton
                  title={t("month")}
                  onPress={savedWMYcount.WMY == "M" ? null : () => setSavedWMYcount(() => ({ WMY: "M", count: 0 }))}
                  MyStyle={savedWMYcount.WMY == "M" ? { fontSize: 26 } : { fontSize: 22, color: "#000", opacity: 0.4 }}
                  MyStyleBTN={(savedWMYcount.WMY == "M") && { borderColor: "#000", borderWidth: 2 }}
                />
                <View style={{ marginHorizontal: 5 }} />
                <GlassmorphismButton
                  title={t("year")}
                  onPress={savedWMYcount.WMY == "Y" ? null : () => setSavedWMYcount(() => ({ WMY: "Y", count: 0 }))}
                  MyStyle={savedWMYcount.WMY == "Y" ? { fontSize: 26 } : { fontSize: 22, color: "#000", opacity: 0.4 }}
                  MyStyleBTN={(savedWMYcount.WMY == "Y") && { borderColor: "#000", borderWidth: 2 }}
                />
              </View>

              <NeumorphicButton
                title={showInterval}
                MyStyle={{ fontSize: 20 }}
              />
              {/* <Text>{}</Text> */}
              <View style={{ flexDirection: "row", marginVertical: 25 }}>
                <GlassmorphismButton
                  title={" 👈 "}
                  onPress={() => setSavedWMYcount((pre) => ({ ...pre, count: pre.count - 1 }))}
                />
                <View style={{ marginHorizontal: 15 }} />
                <GlassmorphismButton
                  title={" ⚪️ "}
                  onPress={() => setSavedWMYcount((pre) => ({ ...pre, count: 0 }))}
                />
                <View style={{ marginHorizontal: 15 }} />
                <GlassmorphismButton
                  title={" 👉 "}
                  onPress={() => setSavedWMYcount((pre) => ({ ...pre, count: pre.count + 1 }))}
                />
                {/* ➖➕✖️ 🫵 ⚪️✊*/}
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>

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
    borderWidth: 0,
    // backgroundColor: "#ffe",
  },

  headrow: {
    paddingRight: 5,
    paddingLeft: 3,
    marginBottom: 7,
    borderBottomWidth: 2,
    borderColor: "#000",
    flexDirection: "row",
    // zIndex:2
  },
  headD: {
    flex: 1.7,
    borderRightWidth: 0,
    borderColor: "#000",
    margin: 1,
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    textAlignVertical: "center",
  },
  headW: {
    flex: 1.0,
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
    borderWidth: 0,
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
    borderWidth: 0,
    // zIndex:1000,
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
    marginTop: "30%",
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
    flex: 0,
  },
  addbtnviever: {
    height: "auto",
    borderWidth: 0,
    justifyContent: "center",
    flex: 1,
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


  oneNoteItem: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    padding: 3,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 15,
  },
  oneNoteItemText: {
    flex: 1,
    fontSize: 20,
  },
  allNoteItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 3,
    marginTop: 2,
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 6,
  },
  allNoteItemTextDate: {
    padding: 5,
    verticalAlign: "top",
    fontSize: 20,
    // borderRightWidth: 3,
    borderColor: 'rgba(187, 187, 187, .5)',
    // marginRight: -5,
    fontWeight: "900",
    flex: 1,
    // paddingRight:6
  },
  allNoteItemTextYear: {
    color: 'rgba(150, 150, 150, .9)',
    letterSpacing: 3,
    fontSize: 18,
    fontWeight: "400"
  },
  allNoteItemText: {
    padding: 5,
    flex: 1,
    fontSize: 18,
    borderLeftWidth: 0,
    textAlign: "justify",
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: 0 }, { translateY: -50 }],
    zIndex: 10000000,
  },
  switchContainer: {
    flex: 0, 
    flexDirection: 'row', 
    paddingRight: 15, 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderWidth: 0, 
    width: "100%"
  },
  switchText: {
    color: "#000", 
    borderWidth: 0, 
    padding: 10, 
    fontSize: 22, 
    fontWeight:"500" 
  },
});
