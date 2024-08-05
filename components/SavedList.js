import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SavedList({ element, deleteElement, sendToTodo }) {

    return (
        <View style={styles.container}>
            {element.isintodo || <Ionicons name="chevron-back-circle-outline" size={50} color="#6b9e23" style={styles.sendicon} onPress={() => sendToTodo(element.key)} />}
            <Text style={styles.todotext}>{element.text}</Text>
            <Ionicons name="trash-outline" size={42} color="lightcoral" style={styles.dellicon} onPress={() => deleteElement(element.key)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 8,
        borderWidth: 0,
        borderColor: "#c00",
        minWidth: "100%",
        marginVertical: 5
    },
    todotext: {
        padding: 4,
        flex: 1,
        textAlign: "left",
        backgroundColor: 'rgba(253, 245, 230, .3)',
        borderWidth: 1,
        borderColor: "#999",
        borderRadius: 5,
        fontSize: 20,
        marginHorizontal: 1,
    },
    dellicon: {
        marginRight: 4,
    },
    sendicon: {
        marginRight: 2,
    }
});
