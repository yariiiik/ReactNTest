
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import GlassmorphismButton from "./buttons/GlassmorphismButton";
import NeumorphicButton from "./buttons/NeumorphicButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default ControlBtn = ({ onData }) => {
  const [elements, setElements] = useState(["🍑", "🍌", "🍓", "🍒"]);

  const handleButtonPress = (index) => {
    let newElements = [...elements];
    const separatorIndex = newElements.indexOf('*');

    if (separatorIndex === -1) {
      // Если разделителя нет, добавить его после нажатой кнопки и переместить кнопку в начало
      let selectedEl = newElements.splice(index, 1);
      newElements.unshift('*');
      newElements.unshift(selectedEl[0]);
      // newElements.splice(1, 0, '*');
    } else {
      // Если разделитель есть - Переместить кнопку вправо/влево от разделителя
      newElements.splice(separatorIndex, 0, newElements.splice(index, 1)[0]);
      // Удалить разделитель, если нажата единственная кнопка с одной из сторон
      if ((separatorIndex === 1 && index === 0) || (separatorIndex === newElements.length - 2 && index === newElements.length - 1)) {
        newElements = newElements.filter(el => el !== '*');
      }
    }
    setElements(newElements);
    let sendMass = [];
    for (const item of newElements) {
      if (item === '*') { break }
      sendMass.push(item)
    }
    onData(sendMass);
  };

  let trigger = 0;

  return (
    <View style={{ flexDirection: "column", alignItems: 'center', justifyContent: 'center', padding: 0 }}>
      {elements.map((el, index) => {
        if (el === '*') trigger = 1;
        return (<React.Fragment key={index}>
          {el === '*' ? <MaterialCommunityIcons name="arrow-up-down-bold-outline" size={42} color="rgba(155, 155, 155, 0.7)" key={index} /> : (trigger ? <GlassmorphismButton title={el} onPress={() => handleButtonPress(index)} key={index} /> : <NeumorphicButton title={el} onPress={() => handleButtonPress(index)} key={index} />)}
        </React.Fragment>)
      })
      }
    </View>
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


