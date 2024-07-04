import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');

const CustomTooltip = ({ content, children  }) => {
  const [visible, setVisible] = useState(false);
 
 
  const toggleTooltip = () => {    
    setVisible(vis=>!vis);    
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleTooltip}>
        {children}
      </TouchableWithoutFeedback>
      {visible && (<>
          <TouchableWithoutFeedback style={styles.overlay} onPress={toggleTooltip}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>{content}</Text>
          </View>
        </>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    width: width,
    height: height+150,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000
  },
  tooltip: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -width * 0.4 }, { translateY: -height * 0.25 }],
    width: width * 0.8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'purple',
    zIndex: 1001,
  },
  tooltipText: {
    color: 'black',
    textAlign: 'center',
  },
});

export default CustomTooltip;
