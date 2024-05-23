import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default function Form({ addTask }) {
    const [textinput, setTextinput] = useState("");
    const onChange = (textinput) => {
        setTextinput(textinput)
    };
    const handlePress = () => {
        if (textinput) {
            addTask(textinput);
            setTextinput(""); // Очищаем текстовое поле после добавления задачи
        } else alert("There's nothing to save.\nYou haven't entered anything.");
    };

    return (
        <View style={{borderTopWidth:3,borderColor:"#ddd",padding:0,}}>
            <TextInput
                style={styles.input}
                onChangeText={onChange}
                placeholder="Write your task"
                placeholderTextColor="gray"
                multiline maxLength={100}
                numberOfLines={2}
                value={textinput}
            />
            <View style={styles.buttoneround}>
                <Button onPress={handlePress} title="Save" color="skyblue"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 3,
        borderColor: "skyblue", // (#87ceeb)
        width: "80%",
        marginHorizontal: "10%",
        fontSize: 20,
        padding: 0,
        
    },
    buttoneround: {
        width: "50%",
        marginHorizontal: "25%",
        paddingVertical: 10,
        
    }
});