import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function Header({ listlen, donetodo }) {
    // console.log("HomeScreen -> donetodo", donetodo, listlen);
    return (
        <View style={styles.main}>
            <Text style={styles.maintext}>To Do List</Text>
            {/* <Image source={require('../assets/to-do3-removebg-preview.png')} style={{ width: 100, height: 40 }}/> */}
            {(donetodo/listlen)==1?<Image source={require("../assets/iskra-1-0.gif")} style={{ width: 40, height: 40 }} />:null}
            <Text style={styles.counts}>{donetodo + " / " + listlen}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 0,
        flexDirection: "row",
        backgroundColor: "#efefde",
        alignItems: "left",
        justifyContent: "center",
        width: "100%",
        borderTopWidth: 2, 
        borderBottomWidth: 2,
        borderColor:"rgba(100,100,100,0.1)",
    },
    maintext: {
        textAlign: "center",
        padding: 5,
        fontSize: 22,
        color: "#533",
        fontWeight: "500",
    },
    counts: {
        fontSize: 24,
        color: "#6B9E22",
        marginLeft: 10,
        padding: 5,
        fontWeight: "900",
        
    },
});
