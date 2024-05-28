import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
// import Animated, { useSharedValue, withSpring, withDelay, useAnimatedStyle, withSequence } from "react-native-reanimated";

export default function SavedList({ element, deleteElement, sendToTodo }) {


    return (
        <View style={styles.container}>
            <AntDesign name="delete" size={40} color="lightcoral" style={styles.dellicon} onPress={() => deleteElement(element.key)} />
            <Text style={styles.todotext}>{element.text}</Text>
            {element.isintodo||<AntDesign name="rightcircleo" size={40} color="#6b9e23" style={styles.sendicon}  onPress={() => sendToTodo(element.key)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: "center",
        paddingHorizontal: 3,
        borderWidth: 0,
        borderColor: "#c00",
        minWidth:"100%",
        marginVertical:5
    },
    todotext: {
        padding: 4,
        flex: 1,
        textAlign: "left",
        backgroundColor: 'rgba(253, 245, 230, .3)',
        borderWidth: 1,
        borderColor:"#999",
        borderRadius: 5,
        // marginTop: 10,
        fontSize: 18,
        marginHorizontal:1,
    },
    dellicon: {
        marginHorizontal: 6,
        // marginTop: 10,
    },
    sendicon: {
        marginHorizontal: 6,
        // marginTop: 10,
    }
});
