import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Dropdown = ({ options, selectedValue, onValueChange, placeholder, changeLanguage, defLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item) => {
    onValueChange(item.label);
    changeLanguage(item.value,item.label);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdown} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.text}>
          {selectedValue ? selectedValue : placeholder}
        </Text>
        <MaterialIcons name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'} size={24} />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownList}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => {
              return defLanguage != item.value ? (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => { handleSelect(item) }}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
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
    // width: '100%',
    // marginHorizontal:"10%"
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
  text: {
    fontSize: 16,
  },
  dropdownList: {
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});

export default Dropdown;