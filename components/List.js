import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';

export default function List({ element, deleteElement, toggleCheckbox }) {
    const [marginLeftValue,setMarginLeftValue] =useState(element?.checked?-20:-33);
    const [showChecIcon, setShowChecIcon] = useState(element?.checked?false:true);
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);
    const timerRef = useRef(null);

    const slideAnim = useSharedValue("5%");
    const opacityAnim = useSharedValue(0);

    const ChecboxAction = ({ onPress }) => (<Ionicons
        name="checkbox-outline"
        size={46}
        color="#6b9e23"
        style={styles.icon}
        onPress={onPress}
    />);
    const clickChecboxAction = () => {
        setShowChecIcon(false);
        setMarginLeftValue(-20);
        setShowDeleteIcon(false);
        slideAnim.value = withSpring("5%", { stiffness: 500, damping: 20 });
        opacityAnim.value = withSpring(0, { stiffness: 100 });
        toggleCheckbox(element.key); // Вызываем функцию toggleCheckbox с ключом элемента
    }

    const toggleDeleteIcon = () => {
        setShowDeleteIcon((prev) => !prev);
        slideAnim.value = withSpring(showDeleteIcon ? "5%" : marginLeftValue, { stiffness: showDeleteIcon ? 300 : 200 , damping: showDeleteIcon ? 10 : 18});
        opacityAnim.value = withSpring(showDeleteIcon ? 0 : 1, { stiffness: showDeleteIcon ? 100 : 20 });
        if (!showDeleteIcon) {
            timerRef.current = setTimeout(() => {
                setShowDeleteIcon(false);
                slideAnim.value = withSpring("5%", { stiffness: 500, damping: 20 });
                opacityAnim.value = withSpring(0, { stiffness: 100 });
            }, 5000);
            console.log('timer.current: -> ', timerRef.current);
        } else {
            console.log('timer.current: -> ', timerRef.current);
            clearTimeout(timerRef.current);
        }
    };

    const slideStyle = useAnimatedStyle(() => {
        return {
            marginLeft: slideAnim.value
        };
    });

    const iconStyle = useAnimatedStyle(() => {
        return {
            opacity: opacityAnim.value,
        };
    });

    return (
        <TouchableWithoutFeedback
            style={styles.container}
            onPress={toggleDeleteIcon}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Animated.View style={[styles.textContainer, slideStyle]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {showChecIcon || (
                            <Ionicons
                                name="checkbox"
                                size={26}
                                color="#6b9e23"
                                style={{
                                    marginRight: 10, marginTop: 10
                                }}
                            />
                        )}
                        <Text style={styles.todotext}>{element.text}</Text>
                    </View>
                </Animated.View>
                <Animated.View
                    style={[{ flexDirection: 'row', alignItems: 'center' }, iconStyle]}>
                    <Ionicons
                        name="chevron-back-circle-outline"
                        size={46}
                        color="gray"
                        style={styles.icon}
                        onPress={() => { }}
                    />
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
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    textContainer: {
        width: '90%',
    },
    todotext: {
        padding: 8,
        flex: 1,
        textAlign: "left",
        backgroundColor: "#fdf5e6",
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        fontSize: 22
    },
    icon: {
        marginLeft: 6,
        marginTop: 10
    }
});
