import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default function Form({addTask}) {
    const [textinput, setTextinput] = useState("");
    const onChange = (textinput) => {
        setTextinput(textinput)
    };
    return (
        <View>
            <TextInput style={styles.input} onChangeText={onChange} placeholder="Напишите свою задачу" placeholderTextColor="gray" multiline maxLength={40} numberOfLines={2} />
            <View style={styles.buttoneround}>
                <Button onPress={()=>addTask(textinput)} title="Сохранить"/>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 3,
        borderColor: "skyblue", // (#87ceeb)
        // padding: 10,
        width:"80%",
        marginHorizontal:"10%",
        fontSize:20,
        // marginVertical:10,

    },
    buttoneround:{
        width:"50%",
        marginHorizontal:"25%",
        paddingVertical:10,
    }

});