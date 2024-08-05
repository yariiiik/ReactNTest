import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Dropdown = ({ options, selectedValue, onValueChange, placeholder, changeLanguage, defLanguage, myStyles }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item) => {
    onValueChange(item.label,item.value);
    changeLanguage(item.value, item.label);
    setIsOpen(false);
  };

  return (
    <View style={myStyles?styles.Hcontainer:styles.container}>
      <TouchableOpacity style={myStyles?styles.Hdropdown:styles.dropdown} onPress={() => setIsOpen(!isOpen)}>
        {myStyles&&(<View style={{width:48, borderWidth: 0,}}></View>)}
        <Text style={myStyles?styles.Htext:styles.text}>
          {selectedValue ? selectedValue : placeholder}
        </Text>
        <MaterialIcons style={{borderWidth: 0,  }} name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'} size={myStyles?48:24} />
      </TouchableOpacity>
      {isOpen && (
        <View style={myStyles?styles.HdropdownList:styles.dropdownList}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => {
              return defLanguage != item.value ? (
                <TouchableOpacity
                  style={myStyles?styles.HdropdownItem:styles.dropdownItem}
                  onPress={() => { handleSelect(item) }}>
                  <Text style={myStyles?styles.HitemText:styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              ) : null
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  Hcontainer: {
    width: '100%',
    marginTop:3
  },

  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
 Hdropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderColor: 'rgba(0, 0, 0, .1)',
  },

  text: {
    fontSize: 16,
  }, 
  Htext: {
    fontSize: 22,
    color: "#442",
    fontWeight: "500",
    textAlign: "center",
    borderWidth: 0,
  },

  dropdownList: {
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',   
  }, 
  HdropdownList: {
    marginTop: 54,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fffff5',
    maxHeight: 500,
    borderColor: 'rgba(0, 0, 0, .3)',
    position:"absolute",
    zIndex: 100,
    width:"100%",
  },

  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
    HdropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderStyle:"dotted"
  },

  itemText: {
    fontSize: 16,
  },
   HitemText: {
    fontSize: 20,
    paddingLeft:6
  },
});

export default Dropdown;