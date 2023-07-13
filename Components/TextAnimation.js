import React, { useEffect, useRef, useState } from "react";
import { Animated, Text } from "react-native";

const TextAnimation = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const textArray = ["unique experiences", "new vibes", "sick museums", "dope trails", "yummy restaurants"];

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );

        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();
    }, [currentTextIndex]);

    const interpolatedOpacity = fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });

    return (
        <Animated.View style={{ opacity: interpolatedOpacity }}>
            <Text style={{ fontSize: 25, color: "white", fontFamily: "Futura-Medium", }}>
                {textArray[currentTextIndex]}
            </Text>
        </Animated.View>
    );
};

export default TextAnimation;
