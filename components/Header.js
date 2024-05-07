import React from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';

export default function Header() {

    return (
        <View style={styles.main}>
            <Image
        source={require('../cat002r.png')}
        // source={{
        //   uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
        // }}
        style={{ width: 50, height: 50 }}
      />
            <Text style={styles.maintext}>
                ту-дусы.
            </Text>
        </View>

    );
}

const styles = StyleSheet.create({
    main: {
        flex: 0,
        flexDirection: 'row',
        backgroundColor: '#fdf5e6',
        alignItems: 'center',
        justifyContent: 'center',
        color: "#33ff55",
        width: "100%"
    },
    maintext: {
        textAlign: 'center',
        padding: 5,
        fontSize: 20,
        color: "#533",
        fontWeight: '500',
    }
});
