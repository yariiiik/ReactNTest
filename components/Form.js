import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';
import SaveAndDellButton from "../components/buttons/SaveAndDellButton";
import { useTranslation } from 'react-i18next';

export default function Form({ addTask, title, btntitle }) {
    const [textinput, setTextinput] = useState("");
    const { t, i18n } = useTranslation();
    const onChange = (textinput) => {
        setTextinput(textinput)
    };
    const handlePress = () => {
        if (textinput) {
            addTask(textinput);
            setTextinput(""); // Очищаем текстовое поле после добавления задачи
        } else {
            Alert.alert(
                t("alert"),
                t("nothingtosave"),
                [{ text: t("ok") }],
                { cancelable: true }
            );
        };
    };

    return (
        <View style={{ borderTopWidth: 3, borderColor: "#ddd", }}>
            <TextInput
                style={styles.input}
                onChangeText={onChange}
                placeholder={title}
                placeholderTextColor="gray"
                multiline
                maxLength={100}
                // numberOfLines={2}
                value={textinput}
            />
            <SaveAndDellButton title={btntitle} onPress={handlePress} SaveOrDell={1} />
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
    }
});