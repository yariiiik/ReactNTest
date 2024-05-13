import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions, ScrollView, FlatList } from "react-native";

export default function SettingsScreen() {
  let smeni_names = ["🍌", "🍑", "🍓", "🍒"];
  let shifts = [0, 14, 7, 21];
  let dninedeli = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  let graf_shifts = ["N", "N", "N", "N", "N", "N", "🍺", "O", "O", "O", "O", "🍺", "R", "R", "R", "🍺", "🍺", "🍺", "O", "O", "O", "🍺", "R", "R", "R", "R", "🍺", "☕️"];

  const [savedMonth, setSavedMonth] = useState(0);

  let getUserDate = () => {
    let UD = new Date();
    UD.setMonth(UD.getMonth() + savedMonth);
    let UDFullYear = UD.getFullYear();
    let UDMonth = UD.getMonth() + 1;

    let UDStart = new Date(`${UDFullYear}-${UDMonth}-1`);
    let UDLastDay = new Date(UDFullYear, UDMonth, 0);
    let UDEnd = new Date(`${UDFullYear}-${UDMonth}-${UDLastDay.getDate()}`);
    let UDStartDayOfYear = Math.round((UDStart - new Date(2024, 0, 1)) / (24 * 60 * 60 * 1000));
    return { UDStart, UDEnd, UDStartDayOfYear }
  }

  let createMassDate = (print_shift) => {
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1;
    let UserDate = getUserDate();
    let day, month, weekDay, dateText;
    let massObjData = [];
    while (UserDate.UDStart <= UserDate.UDEnd) {
      let currentshifts = [];
      day = UserDate.UDStart.getDate();
      month = UserDate.UDEnd.getMonth() + 1;

      dateText = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}`;
      weekDay = dninedeli.at(UserDate.UDStartDayOfYear % 7);

      print_shift.forEach(element => {
        currentshifts.push(graf_shifts[(UserDate.UDStartDayOfYear + element) % graf_shifts.length])
      });

      massObjData.push({ day: dateText, weekDay, shifts: currentshifts });

      UserDate.UDStartDayOfYear++;
      UserDate.UDStart.setDate(UserDate.UDStart.getDate() + 1);
    }
    return massObjData;
  };

  const getTodayDate = () => {
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1;
    return { todayDay, todayMonth };
  }
  const { todayDay, todayMonth } = getTodayDate();

  const DateItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <CellDate today={item.day === `${todayDay}.${todayMonth}`} T={item.day} />
        <WeekDay dn={item.weekDay} />
        {item.shifts.map((element, index) => (
          <Yachejka el={element} key={index.toString()} />
        ))}
      </View>
    );
  };

  const CellDate = ({ today, T }) => {
    return (<Text style={today ? styles.dateToday : styles.date}>{T}</Text>)
  };
  const WeekDay = ({ dn }) => {
    if (dn == "Сб" || dn == "Вс") { return (<Text style={styles.textDenNedV}>{dn}</Text>) }
    return (<Text style={styles.textDenNed}>{dn}</Text>)
  };
  const Yachejka = ({ el }) => {
    if (el == "N") { return (<Text style={styles.textN}>{el}</Text>) }
    if (el == "O") { return (<Text style={styles.textO}>{el}</Text>) }
    if (el == "R") { return (<Text style={styles.textR}>{el}</Text>) }

    return (<Text style={styles.text}>{el}</Text>)
  };

  return (
    <SafeAreaView style={{ borderWidth: 0, borderColor: "#090", padding: 3, height: "100%" }}>
      
        <View style={styles.container}>
          <View style={{ borderWidth: 1, width: "70%", }}>
            <FlatList
              data={createMassDate([shifts[1], shifts[0], shifts[2], shifts[3]])}
              renderItem={({ item }) => <DateItem item={item} />}
              keyExtractor={(item, index) => index.toString()} // Уникальный ключ для каждого элемента
            />
          </View>

          <View style={styles.shift}>
            <Text>buttons</Text>
          </View>

        </View>
      
      <View style={{ height: 90, borderWidth: 0, borderColor: "#900", backgroundColor: "#eea" }}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "center",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row', // Здесь применяем flexDirection: 'row'
    overflow: "hidden",
  },
  date: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 14,
    fontWeight: "900",
    borderWidth: 1,
    borderRadius: 5,
    margin: 1,
    color: "#000",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    paddingHorizontal: 8,
  },
  dateToday: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "900",
    paddingVertical: 3,
    borderWidth: 1,
    borderRadius: 5,
    margin: 1,
    color: "#000",
    backgroundColor: "#f99",
    borderColor: "#ccc",
    paddingHorizontal: 8,
  },
  textDenNed: {
    flexGrow: 1,
    textAlign: "center",
    textAlignVertical: 'center',
    fontSize: 14,
    fontWeight: "900",
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 5,
    margin: 1,
    color: "#000",
    backgroundColor: "#fff",
    borderColor: "#ccc",
  },
  textDenNedV: {
    flexGrow: 1,
    textAlignVertical: 'center',
    textAlign: "center",
    fontSize: 14,
    fontWeight: "900",
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 5,
    margin: 1,
    color: "#400",
    backgroundColor: "#fee",
    borderColor: "#ccc",
  },
  shift: {
    width: "15%",
    borderWidth: 1,
  },
  text: {
    textAlign: "center",
    textAlignVertical: 'center',
    fontSize: 14,
    fontWeight: "900",
    paddingVertical: 1,
    borderWidth: 1,
    borderRadius: 5,
    margin: 1,
    color: "#000",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    paddingHorizontal: 3,
  },
  textN: {
    textAlign: "center",
    textAlignVertical: 'center',
    fontSize: 14,
    fontWeight: "900",
    borderWidth: 1,
    borderRadius: 5,
    margin: 1,
    color: "#FFFFFF",
    backgroundColor: "#000",
    borderColor: "#ccc",
    paddingHorizontal: 8,
  },
  textO: {
    textAlign: "center",
    textAlignVertical: 'center',
    fontSize: 14,
    fontWeight: "900",
    borderWidth: 1,
    borderRadius: 5,
    margin: 1,
    color: "#ee0",
    backgroundColor: "#58F",
    borderColor: "#ccc",
    paddingHorizontal: 8,
  },
  textR: {
    textAlign: "center",
    textAlignVertical: 'center',
    fontSize: 14,
    fontWeight: "900",
    borderWidth: 1,
    borderRadius: 5,
    margin: 1,
    color: "#c22",
    backgroundColor: "#ffc",
    borderColor: "#aaa",
    paddingHorizontal: 8,
  },
});
