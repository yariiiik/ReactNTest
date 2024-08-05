
import React from 'react';
import { View, StyleSheet } from 'react-native';
import GlassmorphismButton from "./buttons/GlassmorphismButton";
import NeumorphicButton from "./buttons/NeumorphicButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default ControlBtn = ({ handleFromControlBtn, firstLoad }) => {

  console.log("🚀🚀🚀🚀🚀~ elements:", firstLoad);
  let trigger;

  const handleButtonPress = (index) => {
    let newElements = firstLoad;
    const separatorIndex = newElements.indexOf('*');

    if (separatorIndex === -1) {
      // Если разделителя нет, добавить его после нажатой кнопки и переместить кнопку в начало
      let selectedEl = newElements.splice(index, 1);
      newElements.unshift('*');
      newElements.unshift(selectedEl[0]);     
    } else {
      // Если разделитель есть - Переместить кнопку вправо/влево от разделителя
      newElements.splice(separatorIndex, 0, newElements.splice(index, 1)[0]);
      // Удалить разделитель, если нажата единственная кнопка с одной из сторон
      if ((separatorIndex === 1 && index === 0) || (separatorIndex === newElements.length - 2 && index === newElements.length - 1)) {
        newElements = newElements.filter(el => el !== '*');
      }
    }
    trigger = 0;
    handleFromControlBtn(newElements);
  };

  return (firstLoad.length > 1 ? (
    <View style={{ flexDirection: "column", alignItems: 'center', justifyContent: 'center', padding: 0, }}>
      {firstLoad.map((el, index) => {
        if (el === '*') trigger = 1;
        return (el === '*' ? <MaterialCommunityIcons name="arrow-up-down-bold-outline" size={42} color="rgba(155, 155, 155, 0.7)" key={index} /> : (trigger ? <GlassmorphismButton title={el} onPress={() => handleButtonPress(index)} key={index} /> : <NeumorphicButton title={el} onPress={() => handleButtonPress(index)} key={index} />))
      })
      }
    </View>) : null
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    width: 10,
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 5,
  },
});


