import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import Header from '../components/Header';
import List from '../components/List';
import Form from '../components/Form';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
// export default function HomeScreen({ route }) {
    let keyboardStatus = false;
    // let keyboardStatus = false;
    // if (route.params && route.params.keyboardStatus !== undefined) {
    //     keyboardStatus = route.params.keyboardStatus;
    // }

    // console.log("HomeScreen=", keyboardStatus);
    const [listtodos, setListtodos] = useState([
        { text: "Создать первое напоминание)", key: "" + Date.now(), checked: false }
    ]);

    useEffect(() => {
        AsyncStorage.getItem('myKey')
            .then((value) => {
                if (value !== null) {
                    setListtodos(JSON.parse(value));
                }
            })
            .catch((error) => console.log(error));
    }, []);

    const addTask = (inptext) => {
        setListtodos((prevListtodos) => {
            const newListtodos = [{ text: inptext, key: "" + Date.now(), checked: false }, ...prevListtodos];
            saveData(newListtodos); // Вызываем saveData с новым списком задач
            return newListtodos;
        });
    }

    const deleteElement = (key) => {
        setListtodos((prevListtodos) => {
            const newListtodos = prevListtodos.filter(item => item.key != key);
            saveData(newListtodos);
            return newListtodos
        })
    }

    const toggleCheckbox = (key) => {
        setListtodos((prevListtodos) => {
            const newListtodos = prevListtodos.map(item => {
                if (item.key === key) {
                    item.checked = !item.checked; // Изменяем состояние checked
                }
                return item;
            });
            saveData(newListtodos); // Сохраняем изменения
            return newListtodos;
        });
    };

    const saveData = async (newListtodos) => {
        try {
            await AsyncStorage.setItem('myKey', JSON.stringify(newListtodos));
            // console.log('Данные сохранены:\n', newListtodos);
        } catch (error) {
            alert('Ошибка - ' + error);
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                barStyle={"light-content"}
                style={styles.stausba}
                hidden={false}
                showHideTransition={"slide"}
                backgroundColor={"#eee8aa"}
                // currentHeight="50%" 
                translucent={false}
                networkActivityIndicatorVisible={true}
            />
            <Header />
            <View style={[styles.body, { marginBottom: keyboardStatus ? 2 : 100, }]}>
                <Form addTask={addTask} />
                <FlatList data={listtodos} renderItem={({ item }) =>
                    <List
                        element={item}
                        deleteElement={deleteElement}
                        toggleCheckbox={toggleCheckbox} // Передаем функцию toggleCheckbox в компонент List
                    />
                } />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eea',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stausba: {

    },
    body: {
        flex: 1,
        width: "100%",
        backgroundColor: 'snow',
        borderWidth: 1,
        justifyContent: "space-evenly",

        paddingBottom: 5,
        borderWidth: 0
    },
});

