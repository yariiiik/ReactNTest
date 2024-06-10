import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useSharedValue, withSpring, withDelay, withTiming, useAnimatedStyle, withSequence, cancelAnimation, runOnJS, Easing } from "react-native-reanimated";

export default function List({ element, deleteElement, toggleCheckbox, saveTodo, }) {
    const [marginLeftValue, setMarginLeftValue] = useState(element?.checked ? -120 : -175);
    const [showChecIcon, setShowChecIcon] = useState(element?.checked ? false : true);
    const [showIcon, setShowIcon] = useState(false);

    const translateX = useSharedValue(0);
    const translateSBX = useSharedValue(0);
    const opacityAnim = useSharedValue(0);

    const ChecboxAction = ({ onPress }) => (
        <Ionicons
            name="checkbox-outline"
            size={46}
            color="#6b9e23"
            style={styles.icon}
            onPress={onPress}
        />
    );
    const clickChecboxAction = () => {
        setShowChecIcon(false);
        setMarginLeftValue(-120);
        setShowIcon(false);
        translateX.value = withSpring(0, { stiffness: 500, damping: 20 });
        opacityAnim.value = withSpring(0, { stiffness: 100 });
        toggleCheckbox(element.key, false); // Вызываем функцию toggleCheckbox с ключом элемента
    };

    // console.log("showIcon: - body -> ", showIcon);

    const toggleShowIcon = () => {

        setShowIcon((prev) => !prev);

        if (showIcon) {
            // Очищаем текущую анимацию, если она есть
            // cancelAnimation(slideAnim);
            // cancelAnimation(opacityAnim);
            translateX.value = withSpring(0, { stiffness: 300, damping: 10 });
            opacityAnim.value = withTiming(0, { duration: 200, easing: Easing.inOut(Easing.ease) });

        } else {
            translateX.value = withSequence(
                withSpring(marginLeftValue, { stiffness: 200, damping: 18 }),
                withDelay(5000, withSpring(0, { stiffness: 500, damping: 20 },
                    () => { runOnJS(setShowIcon)(false) }))
            );
            opacityAnim.value = withSequence(
                withTiming(1, { duration: 700, easing: Easing.inOut(Easing.ease) }),
                withDelay(4800, withTiming(0, { duration: 500, easing: Easing.inOut(Easing.ease) }))
            );
        }
    };

    const clickSaveTodo = () => {
        translateX.value = withDelay(300, withSpring(0, { stiffness: 500, damping: 20 }));
        opacityAnim.value = withTiming(0, { duration: 300, easing: Easing.linear });
        
        translateSBX.value = withSequence(withSpring(300, { stiffness: 200, damping: 100 }), withDelay(300, withSpring(0, { stiffness: 100, damping: 100, })));
        toggleCheckbox(element.key, true);
    };

     const translateStyle = useAnimatedStyle(() => {
        return { transform: [{ translateX: translateX.value }] };
    });
    const translateSBStyle = useAnimatedStyle(() => {
        return { transform: [{ translateX: translateSBX.value }] };
    });
       const iconOpacityStyle = useAnimatedStyle(() => {
        return { opacity: opacityAnim.value };
    });

    return (
        <TouchableWithoutFeedback onPress={toggleShowIcon}>
            <View style={{ borderWidth: 0, borderColor: "#090", marginVertical: 5 }} >
                <Animated.View style={translateStyle}>
                    <View style={styles.container}>
                        <View style={styles.textContainer}>
                            {showChecIcon || (
                                <Ionicons
                                    name="checkbox"
                                    size={26}
                                    color="#6b9e23"
                                    style={{ marginRight: 10 }}
                                />
                            )}
                            <Text style={[styles.todotext,showChecIcon ||styles.todothroughtext]}>{element.text}</Text>
                        </View>

                        <Animated.View style={[styles.iconBOX, iconOpacityStyle]} >
                            <Animated.View style={translateSBStyle}>
                                <Ionicons
                                    name={element.save ? "save" : "save-outline"}
                                    size={42}
                                    color={element.save ? "gray" : "blue"}
                                    style={styles.icon}
                                    onPress={element.save ? () => alert("This todo has already been saved") : clickSaveTodo}
                                />
                            </Animated.View>
                            {showChecIcon && <ChecboxAction onPress={clickChecboxAction} />}
                            <Ionicons
                                name="close-circle-outline"
                                size={46}
                                color="#ff4500"
                                style={styles.icon}
                                onPress={() => deleteElement(element.key)}
                            />
                        </Animated.View>
                    </View>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 0,
        borderWidth: 0,
        borderColor: "#c00",
        // width: "100%"
    },
    textContainer: {
        borderWidth: 0,
        borderColor: "#38e",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "3%",
        // width: "90%",
    },
    todotext: {
        padding: 8,
        flex: 1,
        textAlign: "left",
        backgroundColor: "#fdf5e6",
        borderWidth: 1,
        borderColor: "#999",
        borderRadius: 5,
        // marginTop: 10,
        fontSize: 20,
    },
    todothroughtext:{
        textDecorationLine:"line-through"
    },
    iconBOX: {
        flexDirection: "row",
        alignItems: "center",
        // marginLeft: 6,
        // marginTop: 10,
    },
    icon: {
        marginHorizontal: 5,
    },
});
