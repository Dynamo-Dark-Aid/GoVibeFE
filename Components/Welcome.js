import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated, Alert, Image, SafeAreaView } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TextAnimation from "./TextAnimation";

const Welcome = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Go Vibe
                </Text>
                <MaterialIcons
                    name="location-on"
                    size={50}
                    color="#2757F0"
                    style={styles.icon}
                />
            </View>
            <Text style={styles.body}>Discover <TextAnimation /></Text>
            <Text style={styles.body}>right around the corner.</Text>
            </View>
            {/* </View> */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.buttonText}>Let's Go</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "space-between",
    },
    header: {
        color: "#FFFFFF",
        fontSize: 60,
        fontFamily: "Futura-CondensedExtraBold",
        marginHorizontal: 40,
        marginBottom: 20,
        marginTop: 50
    },
    body: {
        color: "#FFFFFF",
        fontSize: 32,
        fontFamily: "Futura-CondensedExtraBold",
        marginHorizontal: 40,

    },
    button: {
        borderColor: "#E8F0F2",
        borderWidth: 2,
        borderRadius: 10,
        padding: 8,
        marginBottom: 16,
        marginHorizontal: 24,
        alignItems: "center"
    },
    buttonText: {
        color: "#E8F0F2",
        fontSize: 24,
        fontFamily: "Futura",
    },
    buttonContainer: {
        marginBottom: 24
    },
    icon: {
        // position: "relative",
        top: -14,
        right: 40
    },
    headerContainer: {
        flexDirection: "row",
        // justifyContent: "center"
        alignItems: "center"
    }

});

export default Welcome;