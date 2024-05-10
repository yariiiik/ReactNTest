import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, SafeAreaView, Switch } from 'react-native';

export default function App() {
  const [isEnabled, setIsEnabled] = useState(true);
  const timerRef = useRef(null);
  const toggleSwitch = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); }
    setIsEnabled(previousState => !previousState);
    timerRef.current = setTimeout(() => {
      setIsEnabled(previousState => !previousState);
    }, 5000);
  }
  let say = ['Пиривеет!!', 'Пока!!!'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        barStyle={"light-content"}
        style={styles.stausba}
        hidden={false}
        showHideTransition={"slide"}
        backgroundColor={"#aaf"}
        // currentHeight="50%" 
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
      <View style={styles.list}>
        {[...Array(5).keys()].map((index) => {
          let backgroundColor;
          if (index % 2 === 0) {
            backgroundColor = '#cd853f'; // Четные дочерние элементы
          } else {
            backgroundColor = '#ffe4c4'; // Нечетные дочерние элементы
          }
          return (
            <View key={index} style={[styles.child, { backgroundColor }]}>
              <Text style={styles.childText}>-={index}=-</Text>
            </View>
          );
        })}
      </View>
      <View style={{ flex: 1 }}>
        <Switch
          trackColor={{ false: '#888', true: '#999' }}
          thumbColor={isEnabled ? '#eaeaea' : '#333'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text>{isEnabled ? say[0] : say[1]}</Text>

        <Image
          source={isEnabled ? require('./cat002r.png') : require('./cat001r.png')}
          // source={{
          //   uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          // }}
          style={{ width: 200, height: 200 }}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 3,
            padding: 5
          }}
          defaultValue="You can type in me"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffa',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#33ff55",

  },
  stausba: {
    backgroundColor: '#99ee99',
    color: "aaffff",
    fontSize: '55px',
    minHeight: 200
  },
  list: {
    flex: 1,
    width: "100%",
    backgroundColor: 'greenyellow',
    borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-evenly",

  },
  child: {
    // width: "100%",
    // height: 50,
    marginVertical: 5,

  },
  childText: {
    // width: "90%",
    color: "#262",
    fontSize: 16,
    padding: 5,
  }
});
