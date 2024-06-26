import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Pressable, Text } from 'react-native';
import SaveAndDellButton from "../components/buttons/SaveAndDellButton";

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
        <View style={{ borderTopWidth: 3, borderColor: "#ddd", }}>
        {/* <View> */}
            <TextInput
                style={styles.input}
                onChangeText={onChange}
                placeholder="Write your task"
                placeholderTextColor="gray"
                multiline
                maxLength={100}
                // numberOfLines={2}
                value={textinput}
            />
            <SaveAndDellButton title="SAVE" onPress={handlePress} SaveOrDell={1} />
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
        padding: 5,
        // backgroundColor: "#aaa",
    },
    buttoneround: {
        marginVertical: 5,
        width: "50%",
        marginHorizontal: "25%",
        borderColor: "#33aaff",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "skyblue",
    },
    pressedButton: {
        backgroundColor: "#33aaff",
        marginBottom: 2,
        marginTop: 8,        
    },
    buttonText: {
        textAlign: "center",
        // borderWidth: 1,
        fontSize: 26,
        fontWeight: "900",
        color: "white",
        paddingBottom: 2,
    }
});