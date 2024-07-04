import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, findNodeHandle, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const MyTooltip = ({ children, content }) => {
    const [visible, setVisible] = useState(false);
    const [elementPosition, setElementPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const elementRef = useRef(null);

    const toggleTooltip = () => {
        setVisible(!visible);
    };

    const measureElement = () => {
        if (elementRef.current) {
            elementRef.current.measure((fx, fy, width, height, px, py) => {
                setElementPosition({ x: px, y: py, width, height });
            });
        }
    };

    useEffect(() => {
        if (visible) {
            measureElement();
        }
    }, [visible]);

    const arrowLeft = elementPosition.x + elementPosition.width / 2 ;
    console.log("🚀 ~ Tooltip ~ elementPosition:", elementPosition)
    console.log("🚀 ~ Tooltip ~ arrowLeft:", arrowLeft)

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleTooltip} ref={elementRef} style={{ flax:1,flexDirection:"row",  borderWidth: 2, left: -10, borderColor: "rgba(200,100,100,0.8)", padding: 10, alignSelf: "flex-end" }}>
                {children}<View style={styles.Badge}><Text style={styles.BadgeText}>1</Text></View>
            </TouchableOpacity>
            {visible && (
                <View style={styles.tooltipContainer}>
                    <View style={styles.tooltip}>
                        <Text style={styles.text}>{content}</Text>
                    </View>
                    <View style={[styles.tooltipArrow, { right: width-arrowLeft-8 }]} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1, borderColor: "rgba(0,200,100,0.99)"
    },
    tooltipContainer: {
        position: 'absolute',
        bottom: '110%',
        alignSelf: 'flex-end',
        // marginHorizontal: 15,
        width: "80%",
        // borderWidth: 1, borderColor: "rgba(0,0,100,0.99)"
    },
    text: {
        fontSize: 18,
        fontWeight: "300",
        backgroundColor: "transparent",
        textAlign: 'center',
    }, 

    BadgeText: {
        fontSize: 12,
        fontWeight: "900",
        // backgroundColor: "transparent",
        textAlign: 'center',
        // verticalAlign: 'middle',
        paddingLeft: 2,
        paddingRight: 3,
        lineHeight:13
    },
    Badge: { 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"rgba(255,255,255,1)",
        borderRadius:20,
        position: 'absolute',
        shadowColor: '#000',
        elevation: 10,
        borderColor: "rgba(200,0,0,0.99)",
        borderWidth: 2,
        height:16,
        // width:20б
        right:0
    },

    tooltip: {
        backgroundColor:"rgba(255,255,255,1)",
        flex: 0,
        // backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        elevation: 30,
        marginHorizontal: 6,
    },
    tooltipArrow: {
        // position: 'absolute',
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderTopWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: "rgba(255,255,255,1)",
        alignSelf: 'flex-end',
        marginTop: 0,
    },
});

export default MyTooltip;
